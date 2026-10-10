//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingPromoDefaultsValues } from './taon-marketing-promo.constants';
//#endregion

@TaonEntity<TaonMarketingPromoEntity>({
  className: 'TaonMarketingPromoEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonMarketingPromoEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonMarketingPromoEntity extends TaonBaseAbstractEntity<TaonMarketingPromoEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonMarketingPromoDefaultsValues.description,
  })
  //#endregion
  description?: string;
}