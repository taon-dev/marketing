import type { TaonMarketingEventEntity } from './taon-marketing-event.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonMarketingEventDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonMarketingEventEntity>;

export enum TaonMarketingEventErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonMarketingEventTranslationErorsMap = new Map([
  [TaonMarketingEventErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);