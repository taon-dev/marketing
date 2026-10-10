import type { TaonMarketingPromoEntity } from './taon-marketing-promo.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonMarketingPromoDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonMarketingPromoEntity>;

export enum TaonMarketingPromoErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonMarketingPromoTranslationErorsMap = new Map([
  [TaonMarketingPromoErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);