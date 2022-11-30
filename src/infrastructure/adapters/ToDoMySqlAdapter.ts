import IToDoRepository from "../../core/interfaces/repositories/todo/IToDoRepository";
import {ToDo, ToDoToInsert, ToDoToUpdate} from "../../core/entities/todo/ToDo";
import {FastifyInstance} from "fastify";
import {v4 as uuidv4} from "uuid";
import {Knex} from "knex";

export default class ToDoMySqlAdapter implements IToDoRepository {

  private mysql: Knex;

  protected constructor(container: FastifyInstance) {
    this.mysql = container.mysql
  }

  async delete(id: string): Promise<boolean> {
    await this.mysql('todo').where({id}).del()
    return true
  }

  async findOne(id: string): Promise<ToDo> {
    return this.mysql('todo').where({id}).first()
  }

  async getAll(): Promise<ToDo[]> {
    return this.mysql('todo')
  }

  async insert(toDo: ToDoToInsert): Promise<string> {
    const id = uuidv4()
    const completeToDo: ToDo = {
      id,
      ...toDo
    }
    await this.mysql('todo').insert(completeToDo)
    return id
  }

  async update(id: string, fieldsToUpdate: ToDoToUpdate): Promise<ToDo> {
    await this.mysql('todo').where({id}).update(fieldsToUpdate)
    return this.findOne(id) as Promise<ToDo>
  }

}