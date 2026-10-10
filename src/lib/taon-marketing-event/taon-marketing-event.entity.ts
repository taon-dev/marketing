//#region imports
import {
  CustomColumn, Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonMarketingEventDefaultsValues } from './taon-marketing-event.constants';
//#endregion

@TaonEntity({
  className: 'TaonMarketingEventEntity',
  createTable: true,
})
export class TaonMarketingEventEntity extends TaonBaseAbstractEntity<TaonMarketingEventEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonMarketingEventDefaultsValues.description,
  })
  //#endregion
  description?: string;
}