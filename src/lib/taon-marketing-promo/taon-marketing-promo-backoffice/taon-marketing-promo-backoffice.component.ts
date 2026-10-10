//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-marketing-promo-backoffice',
  templateUrl: './taon-marketing-promo-backoffice.component.html',
  styleUrls: ['./taon-marketing-promo-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonMarketingPromoBackofficeComponent {}