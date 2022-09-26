import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductIdToOrdersProducts1663807859212
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product_orders',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'product_orders',
      new TableForeignKey({
        name: 'OrdersProductsProduct',
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'SETNULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_orders', 'OrdersProductsProduct');
    await queryRunner.dropColumn('product_orders', 'product_id');
  }
}
