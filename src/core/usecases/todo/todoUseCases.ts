import {FastifyInstance} from "fastify";
import {ToDo, ToDoToInsert, ToDoToUpdate} from "../../entities/todo/ToDo";

export async function getAllTodos(container: FastifyInstance): Promise<ToDo[]> {
  return container.ToDoRepository.getAll()
}

export async function getToDoById(container: FastifyInstance, id: string): Promise<ToDo> {
  return container.ToDoRepository.findOne(id)
}

export async function insertToDo(container: FastifyInstance, toDo: ToDoToInsert): Promise<string> {
  return container.ToDoRepository.insert(toDo)
}

export async function updateToDo(container: FastifyInstance, id: string, toDo: ToDoToUpdate): Promise<ToDo> {
  return container.ToDoRepository.update(id, toDo)
}

export async function deleteToDo(container: FastifyInstance, id: string): Promise<boolean> {
  return container.ToDoRepository.delete(id)
}