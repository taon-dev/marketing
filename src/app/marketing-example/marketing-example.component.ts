//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaonMarketingPopupsComponent } from '../../lib/taon-marketing-popup/taon-marketing-popups.component';
//#endregion

@Component({
  selector: 'app-marketing-example',
  templateUrl: './marketing-example.component.html',
  styleUrls: ['./marketing-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet, TaonMarketingPopupsComponent],
})
export class MarketingExampleComponent {}