//#region imports
import {
  Column, CreateDateColumn, UpdateDateColumn,
  TaonBaseAbstractEntity, TaonEntity,
} from 'taon/src';
import { TaonMarketingPopupType } from './taon-marketing-popup.models';
//#endregion

@TaonEntity<TaonMarketingPopupEntity>({
  className: 'TaonMarketingPopupEntity',
  createTable: true,
})
export class TaonMarketingPopupEntity extends TaonBaseAbstractEntity<TaonMarketingPopupEntity> {
  //#region @websql
  @Column({ type: 'varchar', length: 200, default: '' })
  //#endregion
  name: string = '';

  //#region @websql
  @Column({ type: 'boolean', default: false })
  //#endregion
  enabled: boolean = false;

  //#region @websql
  @Column({ type: 'varchar', default: TaonMarketingPopupType.Dialog })
  //#endregion
  type: TaonMarketingPopupType = TaonMarketingPopupType.Dialog;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  title: string | null = null;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  content: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  imageKey: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  buttonText: string | null = null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  buttonUrl: string | null = null;

  //#region @websql
  @Column({ type: 'float', default: 0 })
  //#endregion
  delaySeconds: number = 0;

  //#region @websql
  @Column({ type: 'simple-json', nullable: true })
  //#endregion
  displayOnPaths: string[] | null = null;

  //#region @websql
  @Column({ type: 'simple-json', nullable: true })
  //#endregion
  excludePaths: string[] | null = null;

  //#region @websql
  @Column({ type: 'datetime', nullable: true })
  //#endregion
  startAt: Date | null = null;

  //#region @websql
  @Column({ type: 'datetime', nullable: true })
  //#endregion
  endAt: Date | null = null;

  //#region @websql
  @Column({ type: 'integer', nullable: true })
  //#endregion
  maxDisplaysPerVisitor: number | null = null;

  //#region @websql
  @Column({ type: 'boolean', default: true })
  //#endregion
  oncePerSession: boolean = true;

  //#region @websql
  @CreateDateColumn({ type: 'datetime' })
  //#endregion
  createdAt: Date;

  //#region @websql
  @UpdateDateColumn({ type: 'datetime' })
  //#endregion
  updatedAt: Date;
}