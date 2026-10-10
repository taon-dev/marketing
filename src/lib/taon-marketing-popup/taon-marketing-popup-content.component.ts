import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';

export interface TaonMarketingPopupDialogData {
  popup: TaonMarketingPopupEntity;
  imageUrl: string | null;
}

@Component({
  selector: 'taon-marketing-popup-content',
  templateUrl: './taon-marketing-popup-content.component.html',
  styleUrls: ['./taon-marketing-popup-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaonMarketingPopupContentComponent {
  readonly popup = input<TaonMarketingPopupEntity>();
  readonly imageUrl = input<string | null>(null);
  readonly clicked = output<void>();
  readonly closed = output<void>();

  private readonly data = inject<TaonMarketingPopupDialogData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly ref = inject(MatDialogRef<TaonMarketingPopupContentComponent>, { optional: true });

  readonly currentPopup = computed(() => this.popup() ?? this.data?.popup);
  readonly currentImage = computed(() => this.imageUrl() ?? this.data?.imageUrl);

  close(): void {
    if (this.ref) {
      this.ref.close();
    } else {
      this.closed.emit();
    }
  }

  click(): void {
    this.clicked.emit();
    this.close();
  }
}
