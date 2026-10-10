import type { TaonMarketingPopupEntity } from './taon-marketing-popup.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonMarketingPopupDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonMarketingPopupEntity>;

export enum TaonMarketingPopupErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonMarketingPopupTranslationErorsMap = new Map([
  [TaonMarketingPopupErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);