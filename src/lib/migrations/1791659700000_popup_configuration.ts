import { TaonBaseMigration, TaonMigration } from 'taon/src';
import { Table, TableColumn } from 'taon-typeorm/src';
import type { QueryRunner } from 'taon-typeorm/src';

import { TaonMarketingPopupRepository } from '../taon-marketing-popup/taon-marketing-popup.repository';

@TaonMigration({
  className: 'MarketingContext_1791659700000_popup_configuration',
})
export class MarketingContext_1791659700000_popup_configuration extends TaonBaseMigration {
  private readonly popups = this.injectCustomRepo(TaonMarketingPopupRepository);

  async up(queryRunner: QueryRunner): Promise<void> {
    // TODO What is this ?
    const schema = Table.create(this.popups.metadata, queryRunner.connection.driver);
    await queryRunner.startTransaction();
    try {
      let table = await queryRunner.getTable(schema.name);
      if (!table) {
        await queryRunner.createTable(schema);
      } else {
        const existingColumns = table.columns;
        const missing = schema.columns.filter(column =>
          !existingColumns.some(existing => existing.name === column.name),
        );
        if (missing.length) {
          await queryRunner.addColumns(table, missing);
        }
      }
      table = await queryRunner.getTable(schema.name);
      const escape = (name: string) => queryRunner.connection.driver.escape(name);
      if (table?.columns.some(column => column.name === 'description')) {
        await queryRunner.query(
          `UPDATE ${escape(schema.name)} SET ${escape('name')} = ${escape('description')}
           WHERE ${escape('name')} = '' AND ${escape('description')} <> ''`,
        );
      }
      await queryRunner.query(
        `UPDATE ${escape(schema.name)} SET ${escape('name')} = 'Popup' WHERE ${escape('name')} = ''`,
      );
      await queryRunner.commitTransaction();
    } catch (error: unknown) {
      console.error('[marketing migration] Unable to configure popup schema', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const schema = Table.create(this.popups.metadata, queryRunner.connection.driver);
    await queryRunner.startTransaction();
    try {
      const table = await queryRunner.getTable(schema.name);
      if (!table) {
        throw new Error('Popup table is missing; the schema migration cannot be reverted.');
      }
      if (!table.columns.some(column => column.name === 'description')) {
        await queryRunner.addColumn(table, new TableColumn({
          name: 'description',
          type: 'varchar',
          length: '200',
          default: "''",
        }));
      }
      const escape = (name: string) => queryRunner.connection.driver.escape(name);
      await queryRunner.query(
        `UPDATE ${escape(schema.name)} SET ${escape('description')} = ${escape('name')}`,
      );
      const popupColumns = schema.columns.filter(column =>
        !['id', 'version'].includes(column.name) &&
        table.columns.some(existing => existing.name === column.name),
      );
      await queryRunner.dropColumns(schema.name, popupColumns);
      await queryRunner.commitTransaction();
    } catch (error: unknown) {
      console.error('[marketing migration] Unable to revert popup schema', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
