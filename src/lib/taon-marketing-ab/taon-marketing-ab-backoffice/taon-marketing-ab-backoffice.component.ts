//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-marketing-ab-backoffice',
  templateUrl: './taon-marketing-ab-backoffice.component.html',
  styleUrls: ['./taon-marketing-ab-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonMarketingAbBackofficeComponent {}