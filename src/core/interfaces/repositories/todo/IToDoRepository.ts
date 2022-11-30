import {ToDo, ToDoToInsert, ToDoToUpdate} from "../../../entities/todo/ToDo";

export default interface IToDoRepository {
  insert(toDo: ToDoToInsert): Promise<string>;
  update(id: string, fieldsToUpdate: ToDoToUpdate): Promise<ToDo>;
  delete(id: string): Promise<boolean>;
  findOne(id: string): Promise<ToDo>;
  getAll(): Promise<ToDo[]>;
}