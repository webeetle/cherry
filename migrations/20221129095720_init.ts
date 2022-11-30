import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('todo', function (table) {
      table.uuid('id').notNullable().primary();
      table.text('description').nullable().defaultTo(null);
      table.boolean('done').defaultTo(false)
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
  try {
    await knex.schema.dropTable('todo');
  } catch (e) {
    console.log(e);
  }
}

