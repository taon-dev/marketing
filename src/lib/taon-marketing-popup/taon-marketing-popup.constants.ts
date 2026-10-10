import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { TaonMarketingPopupType } from './taon-marketing-popup.models';

export const TaonMarketingPopupDefaultsValues = {
  name: '',
  enabled: false,
  type: TaonMarketingPopupType.Dialog,
  title: null,
  content: null,
  imageKey: null,
  buttonText: null,
  buttonUrl: null,
  delaySeconds: 0,
  displayOnPaths: null,
  excludePaths: null,
  startAt: null,
  endAt: null,
  maxDisplaysPerVisitor: null,
  oncePerSession: true,
  version: 0,
  id: void 0,
} satisfies Partial<TaonMarketingPopupEntity>;