import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("todo").del();

    // Inserts seed entries
    await knex("todo").insert([
        { id: 'todo1', description: "todo 1", done: false },
        { id: 'todo2', description: "todo 2", done: false },
        { id: 'todo3', description: "todo 3", done: true },
    ]);
}
