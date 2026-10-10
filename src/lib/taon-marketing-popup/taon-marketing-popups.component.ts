import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { EMPTY, Subscription, catchError, filter, startWith, switchMap, tap, timer } from 'rxjs';

import { TaonMarketingPopupApiService } from './taon-marketing-popup.api.service';
import { TaonMarketingPopupContentComponent } from './taon-marketing-popup-content.component';
import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupType } from './taon-marketing-popup.models';
import type { TaonMarketingPopupEvent, TaonMarketingPopupImageResolver } from './taon-marketing-popup.models';
import { TaonMarketingPopupUtils } from './taon-marketing-popup.utils';

interface PendingPopup {
  popup: TaonMarketingPopupEntity;
  dueAt: number;
}

interface VisiblePopup {
  popup: TaonMarketingPopupEntity;
  path: string;
  displayed: boolean;
}

@Component({
  selector: 'taon-marketing-popups',
  template: `
    @if (bottomPopup(); as popup) {
      <aside class="bottom-popup" role="region" [attr.aria-label]="popup.title || 'Marketing popup'">
        <taon-marketing-popup-content
          [popup]="popup"
          (clicked)="click()"
          (closed)="close()">
        </taon-marketing-popup-content>
      </aside>
    }
  `,
  styles: [`
    .bottom-popup {
      position: fixed;
      z-index: 1000;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 50vh;
      overflow: auto;
      color: #222;
      background: #fff;
      box-shadow: 0 -2px 12px #0003;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaonMarketingPopupContentComponent],
  providers: [TaonMarketingPopupApiService],
})
export class TaonMarketingPopupsComponent {
  readonly resolveImage = input<TaonMarketingPopupImageResolver>(key => key);
  readonly popupEvent = output<TaonMarketingPopupEvent>();
  readonly popupError = output<unknown>();
  readonly bottomPopup = signal<TaonMarketingPopupEntity | null>(null);

  private readonly api = inject(TaonMarketingPopupApiService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platform = inject(PLATFORM_ID);
  private pending: PendingPopup[] = [];
  private visible: VisiblePopup | null = null;
  private dialogRef: MatDialogRef<TaonMarketingPopupContentComponent> | null = null;
  private delayTimer?: Subscription;
  private endTimer?: Subscription;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    this.destroyRef.onDestroy(() => this.clear());
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      tap(() => this.clear()),
      switchMap(() => this.api.getActivePopups().pipe(
        catchError((error: unknown) => {
          this.report(error);
          return EMPTY;
        }),
      )),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(popups => {
      const now = Date.now();
      this.pending = popups.filter(popup =>
        Object.values(TaonMarketingPopupType).includes(popup.type) &&
        TaonMarketingPopupUtils.isActive(popup) &&
        TaonMarketingPopupUtils.allowsPath(popup, this.router.url),
      ).map(popup => ({ popup, dueAt: now + popup.delaySeconds * 1000 }));
      this.pending.sort((a, b) => a.dueAt - b.dueAt || a.popup.id - b.popup.id);
      this.scheduleNext();
    });
  }

  click(): void {
    if (this.visible?.displayed) {
      this.emit('popup-click', this.visible);
    }
  }

  close(): void {
    if (this.visible?.displayed) {
      this.emit('popup-close', this.visible);
    }
    this.visible = null;
    this.bottomPopup.set(null);
    this.endTimer?.unsubscribe();
    const ref = this.dialogRef;
    this.dialogRef = null;
    if (ref) {
      ref.close();
      ref.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.scheduleNext());
    } else {
      this.scheduleNext();
    }
  }

  private clear(): void {
    this.pending = [];
    this.delayTimer?.unsubscribe();
    this.endTimer?.unsubscribe();
    if (this.visible?.displayed && !this.destroyRef.destroyed) {
      this.emit('popup-close', this.visible);
    }
    this.visible = null;
    this.bottomPopup.set(null);
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  private scheduleNext(): void {
    if (this.destroyRef.destroyed || this.visible || !this.pending.length) {
      return;
    }
    this.delayTimer?.unsubscribe();
    const next = this.pending[0];
    this.delayTimer = timer(Math.max(0, next.dueAt - Date.now())).subscribe(() => {
      this.pending.shift();
      try {
        if (TaonMarketingPopupUtils.isActive(next.popup) &&
            TaonMarketingPopupUtils.allowsPath(next.popup, this.router.url) &&
            this.allowsVisitor(next.popup)) {
          this.show(next.popup);
        }
      } catch (error: unknown) {
        this.report(error);
        this.close();
      }
      this.scheduleNext();
    });
  }

  private show(popup: TaonMarketingPopupEntity): void {
    const visible: VisiblePopup = { popup, path: this.router.url.split(/[?#]/, 1)[0], displayed: false };
    let imageUrl: string | null = null;
    if (popup.type === TaonMarketingPopupType.Dialog && popup.imageKey) {
      imageUrl = this.resolveImage()(popup.imageKey);
      if (!TaonMarketingPopupUtils.isSafeUrl(imageUrl)) {
        throw new Error(`Popup ${popup.id} image must resolve to an HTTP(S) URL or root-relative path.`);
      }
    }
    this.visible = visible;
    if (popup.type === TaonMarketingPopupType.Bottom) {
      this.recordDisplay(visible);
      this.bottomPopup.set(popup);
    } else {
      const ref = this.dialog.open(TaonMarketingPopupContentComponent, {
        data: { popup, imageUrl },
        width: '480px',
        maxWidth: '95vw',
        ariaLabel: popup.title || 'Marketing popup',
        autoFocus: 'first-tabbable',
      });
      this.dialogRef = ref;
      ref.componentInstance.clicked.subscribe(() => this.click());
      ref.afterOpened().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.visible !== visible) {
          return;
        }
        try {
          if (!TaonMarketingPopupUtils.isActive(popup) || !this.allowsVisitor(popup)) {
            this.close();
            return;
          }
          this.recordDisplay(visible);
        } catch (error: unknown) {
          this.report(error);
          this.close();
        }
      });
      ref.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.visible === visible) {
          this.dialogRef = null;
          this.close();
        }
      });
    }
    this.scheduleEnd(visible);
  }

  private scheduleEnd(visible: VisiblePopup): void {
    if (!visible.popup.endAt) {
      return;
    }
    const delay = new Date(visible.popup.endAt).getTime() - Date.now() + 1;
    this.endTimer = timer(Math.max(0, Math.min(delay, 2147483647))).subscribe(() => {
      if (this.visible !== visible) {
        return;
      }
      if (TaonMarketingPopupUtils.isActive(visible.popup)) {
        this.scheduleEnd(visible);
      } else {
        this.close();
      }
    });
  }

  private storageKey(popup: TaonMarketingPopupEntity): string {
    return `taon-marketing:popup:${popup.id}:displays`;
  }

  private count(storage: Storage, key: string): number {
    const raw = storage.getItem(key);
    const count = raw === null ? 0 : Number(raw);
    if ((raw !== null && !/^\d+$/.test(raw)) ||
        !Number.isSafeInteger(count) || count < 0) {
      throw new Error(`Invalid popup display count in browser storage (${key}).`);
    }
    return count;
  }

  private allowsVisitor(popup: TaonMarketingPopupEntity): boolean {
    const key = this.storageKey(popup);
    return (!popup.oncePerSession || this.count(sessionStorage, key) === 0) &&
      (popup.maxDisplaysPerVisitor === null ||
        this.count(localStorage, key) < popup.maxDisplaysPerVisitor);
  }

  private recordDisplay(visible: VisiblePopup): void {
    const key = this.storageKey(visible.popup);
    const visitorCount = this.count(localStorage, key);
    const sessionCount = this.count(sessionStorage, key);
    localStorage.setItem(key, String(visitorCount + 1));
    sessionStorage.setItem(key, String(sessionCount + 1));
    visible.displayed = true;
    this.emit('popup-impression', visible);
  }

  private emit(name: TaonMarketingPopupEvent['name'], visible: VisiblePopup): void {
    this.popupEvent.emit({
      name,
      category: 'marketing',
      path: visible.path,
      data: { popupId: visible.popup.id, type: visible.popup.type },
      createdAt: new Date(),
    });
  }

  private report(error: unknown): void {
    console.error('[taon-marketing-popups] Unable to load or display popup', error);
    this.popupError.emit(error);
  }
}
