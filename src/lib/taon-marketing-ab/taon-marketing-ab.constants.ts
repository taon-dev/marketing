import type { TaonMarketingAbEntity } from './taon-marketing-ab.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonMarketingAbDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonMarketingAbEntity>;

export enum TaonMarketingAbErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonMarketingAbTranslationErorsMap = new Map([
  [TaonMarketingAbErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);