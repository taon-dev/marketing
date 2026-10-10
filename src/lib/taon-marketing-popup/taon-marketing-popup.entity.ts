//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingPopupDefaultsValues } from './taon-marketing-popup.constants';
//#endregion

@TaonEntity<TaonMarketingPopupEntity>({
  className: 'TaonMarketingPopupEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonMarketingPopupEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonMarketingPopupEntity extends TaonBaseAbstractEntity<TaonMarketingPopupEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonMarketingPopupDefaultsValues.description,
  })
  //#endregion
  description?: string;
}