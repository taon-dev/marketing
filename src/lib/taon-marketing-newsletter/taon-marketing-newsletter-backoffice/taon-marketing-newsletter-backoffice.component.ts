//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-marketing-newsletter-backoffice',
  templateUrl: './taon-marketing-newsletter-backoffice.component.html',
  styleUrls: ['./taon-marketing-newsletter-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonMarketingNewsletterBackofficeComponent {}