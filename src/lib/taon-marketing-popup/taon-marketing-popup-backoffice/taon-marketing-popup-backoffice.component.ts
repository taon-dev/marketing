//#region imports
import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TaonConfirmDialogComponent, TaonDatatableComponent } from '@taon-dev/ui/src';
import { finalize } from 'rxjs';

import { TaonMarketingPopupApiService } from '../taon-marketing-popup.api.service';
import type { TaonMarketingPopupEntity } from '../taon-marketing-popup.entity';
import { TaonMarketingPopupEditorComponent } from './taon-marketing-popup-editor.component';
//#endregion

@Component({
  selector: 'app-taon-marketing-popup-backoffice',
  templateUrl: './taon-marketing-popup-backoffice.component.html',
  styleUrls: ['./taon-marketing-popup-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaonDatatableComponent],
  providers: [TaonMarketingPopupApiService],
})
export class TaonMarketingPopupBackofficeComponent {
  @ViewChild(TaonDatatableComponent)
  readonly datatable!: TaonDatatableComponent;

  private readonly api = inject(TaonMarketingPopupApiService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  readonly error = signal('');
  readonly busy = signal(false);
  readonly crud = this.api.taonMarketingPopupController;
  readonly columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Name', field: 'name', sortable: true },
    { header: 'Type', field: 'type', sortable: true },
    { header: 'Enabled', field: 'enabled', sortable: true },
    {
      header: 'Actions',
      field: 'actions',
      type: 'button',
      buttons: [
        {
          type: 'icon', icon: 'edit', tooltip: 'Edit popup',
          disabled: () => this.busy(),
          click: (popup: TaonMarketingPopupEntity) => this.edit(popup),
        },
        {
          type: 'icon', icon: 'power_settings_new', tooltip: 'Enable / disable popup',
          disabled: () => this.busy(),
          click: (popup: TaonMarketingPopupEntity) => this.toggle(popup),
        },
        {
          type: 'icon', icon: 'delete', tooltip: 'Delete popup',
          disabled: () => this.busy(),
          click: (popup: TaonMarketingPopupEntity) => this.delete(popup),
        },
      ],
    },
  ];

  ngAfterViewInit(): void {
    this.datatable.reload();
  }

  edit(popup?: TaonMarketingPopupEntity): void {
    const ref = this.dialog.open(TaonMarketingPopupEditorComponent, {
      data: popup ?? null,
      width: '640px',
      maxWidth: '95vw',
      disableClose: true,
    });
    ref.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(saved => {
      if (saved) {
        this.datatable.reload();
      }
    });
  }

  toggle(popup: TaonMarketingPopupEntity): void {
    this.busy.set(true);
    this.error.set('');
    this.api.setEnabled(popup.id, !popup.enabled).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy.set(false)),
    ).subscribe({
      next: () => this.datatable.reload(),
      error: (error: unknown) => this.reportError('The popup could not be updated.', error),
    });
  }

  delete(popup: TaonMarketingPopupEntity): void {
    this.busy.set(true);
    const ref = this.dialog.open(TaonConfirmDialogComponent, {
      data: {
        title: 'Delete popup?',
        message: `Permanently delete "${popup.name}"?`,
        confirmText: 'Delete',
      },
    });
    ref.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(confirmed => {
      if (!confirmed) {
        this.busy.set(false);
        return;
      }
      this.error.set('');
      this.api.deletePopup(popup.id).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.busy.set(false)),
      ).subscribe({
        next: () => this.datatable.reload(),
        error: (error: unknown) => this.reportError('The popup could not be deleted.', error),
      });
    });
  }

  private reportError(message: string, error: unknown): void {
    console.error('[taon-marketing-popup-backoffice]', message, error);
    this.error.set(message);
  }
}