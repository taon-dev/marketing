import type { TaonMarketingNewsletterEntity } from './taon-marketing-newsletter.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonMarketingNewsletterDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonMarketingNewsletterEntity>;

export enum TaonMarketingNewsletterErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonMarketingNewsletterTranslationErorsMap = new Map([
  [TaonMarketingNewsletterErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);