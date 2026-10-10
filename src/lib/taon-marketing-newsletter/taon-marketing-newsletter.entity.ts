//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingNewsletterDefaultsValues } from './taon-marketing-newsletter.constants';
//#endregion

@TaonEntity<TaonMarketingNewsletterEntity>({
  className: 'TaonMarketingNewsletterEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonMarketingNewsletterEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonMarketingNewsletterEntity extends TaonBaseAbstractEntity<TaonMarketingNewsletterEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonMarketingNewsletterDefaultsValues.description,
  })
  //#endregion
  description?: string;
}