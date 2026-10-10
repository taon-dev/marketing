import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { TaonMarketingPopupApiService } from '../taon-marketing-popup.api.service';
import type { TaonMarketingPopupEntity } from '../taon-marketing-popup.entity';
import { TaonMarketingPopupType } from '../taon-marketing-popup.models';
import type { TaonMarketingPopupFields } from '../taon-marketing-popup.models';
import { TaonMarketingPopupValidators } from '../taon-marketing-popup.validators';

@Component({
  selector: 'taon-marketing-popup-editor',
  templateUrl: './taon-marketing-popup-editor.component.html',
  styleUrls: ['./taon-marketing-popup-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule],
  providers: [TaonMarketingPopupApiService],
})
export class TaonMarketingPopupEditorComponent {
  readonly popup = inject<TaonMarketingPopupEntity | null>(MAT_DIALOG_DATA);
  readonly types = Object.values(TaonMarketingPopupType);
  readonly busy = signal(false);
  readonly error = signal('');

  private readonly api = inject(TaonMarketingPopupApiService);
  private readonly ref = inject(MatDialogRef<TaonMarketingPopupEditorComponent>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly form = this.fb.group({
    name: [this.popup?.name ?? '', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
    enabled: [this.popup?.enabled ?? false],
    type: [this.popup?.type ?? TaonMarketingPopupType.Dialog],
    title: [this.popup?.title ?? ''],
    content: [this.popup?.content ?? ''],
    imageKey: [this.popup?.imageKey ?? ''],
    buttonText: [this.popup?.buttonText ?? ''],
    buttonUrl: [this.popup?.buttonUrl ?? '', TaonMarketingPopupValidators.url],
    delaySeconds: [this.popup?.delaySeconds ?? 0, [Validators.required, Validators.min(0), Validators.max(2147483)]],
    displayOnPaths: [this.popup?.displayOnPaths?.join('\n') ?? '', TaonMarketingPopupValidators.paths],
    excludePaths: [this.popup?.excludePaths?.join('\n') ?? '', TaonMarketingPopupValidators.paths],
    startAt: [this.localDate(this.popup?.startAt), TaonMarketingPopupValidators.optionalDate],
    endAt: [this.localDate(this.popup?.endAt), TaonMarketingPopupValidators.optionalDate],
    maxDisplaysPerVisitor: new FormControl<number | null>(
      this.popup?.maxDisplaysPerVisitor ?? null, TaonMarketingPopupValidators.optionalPositiveInteger,
    ),
    oncePerSession: [this.popup?.oncePerSession ?? true],
  });

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.busy()) {
      this.error.set('Please correct the invalid fields before saving.');
      return;
    }
    const value = this.form.getRawValue();
    const startAt = value.startAt ? new Date(value.startAt).toISOString() : null;
    const endAt = value.endAt ? new Date(value.endAt).toISOString() : null;
    if (startAt && endAt && startAt > endAt) {
      this.error.set('End date must not precede start date.');
      return;
    }
    const input: TaonMarketingPopupFields = {
      ...value,
      name: value.name.trim(),
      title: value.title.trim() || null,
      content: value.content || null,
      imageKey: value.imageKey.trim() || null,
      buttonText: value.buttonText.trim() || null,
      buttonUrl: value.buttonUrl.trim() || null,
      displayOnPaths: this.paths(value.displayOnPaths),
      excludePaths: this.paths(value.excludePaths),
      startAt,
      endAt,
    };
    this.busy.set(true);
    this.error.set('');
    this.api.savePopup(input, this.popup?.id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy.set(false)),
    ).subscribe({
      next: saved => this.ref.close(saved),
      error: (error: unknown) => {
        console.error('[taon-marketing-popup-editor] Unable to save popup', error);
        this.error.set('The popup could not be saved. Check the fields and try again.');
      },
    });
  }

  close(): void {
    if (!this.busy()) {
      this.ref.close();
    }
  }

  private paths(value: string): string[] | null {
    const paths = value.split('\n').map(path => path.trim()).filter(Boolean);
    return paths.length ? paths : null;
  }

  private localDate(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }
}
