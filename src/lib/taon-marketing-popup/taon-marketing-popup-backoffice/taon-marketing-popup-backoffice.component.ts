//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-marketing-popup-backoffice',
  templateUrl: './taon-marketing-popup-backoffice.component.html',
  styleUrls: ['./taon-marketing-popup-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonMarketingPopupBackofficeComponent {}