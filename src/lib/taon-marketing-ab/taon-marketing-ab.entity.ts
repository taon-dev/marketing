//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingAbDefaultsValues } from './taon-marketing-ab.constants';
//#endregion

@TaonEntity<TaonMarketingAbEntity>({
  className: 'TaonMarketingAbEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonMarketingAbEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonMarketingAbEntity extends TaonBaseAbstractEntity<TaonMarketingAbEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonMarketingAbDefaultsValues.description,
  })
  //#endregion
  description?: string;
}