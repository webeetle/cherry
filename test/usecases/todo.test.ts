import {build, prepareDB, Test} from "../helper";
import {deleteToDo, getAllTodos, getToDoById, insertToDo, updateToDo} from "../../src/core/usecases/todo/todoUseCases";
import {test} from "tap";
import {ToDo, ToDoToInsert} from "../../src/core/entities/todo/ToDo";

test('get all todos', async (t: Test) => {
  const fastify = await build(t)
  await prepareDB(fastify)
  const toDos: ToDo[] = await getAllTodos(fastify)
  t.equal(toDos.length, 3)
})

test('get todo by id', async (t: Test) => {
  const fastify = await build(t)
  await prepareDB(fastify)
  const toDo: ToDo = await getToDoById(fastify, 'todo1')
  t.equal(toDo.id, 'todo1')
})

test('insert todo', async (t: Test) => {
  const fastify = await build(t)
  await prepareDB(fastify)
  const toDo: ToDoToInsert = {
    description: 'test',
    done: false
  }
  const id = await insertToDo(fastify, toDo)
  t.ok(id)
  const toDoInserted: ToDo = await getToDoById(fastify, id)
  t.ok(toDoInserted)
  t.equal(toDoInserted?.description, toDo.description)
  t.notOk(toDoInserted?.done)
})

test('update todo', async (t: Test) => {
  const fastify = await build(t)
  await prepareDB(fastify)
  const toDo: ToDoToInsert = {
    description: 'test',
    done: false
  }
  const id = await insertToDo(fastify, toDo)
  t.ok(id)

  await updateToDo(fastify, id, {done: true, description: 'test2'})

  const toDoUpdated: ToDo = await getToDoById(fastify, id)
  t.ok(toDoUpdated)
  t.equal(toDoUpdated?.description, 'test2')
  t.ok(toDoUpdated?.done)
})

test('delete todo', async (t: Test) => {
  const fastify = await build(t)
  await prepareDB(fastify)
  const toDo: ToDoToInsert = {
    description: 'test',
    done: false
  }
  const id = await insertToDo(fastify, toDo)
  t.ok(id)
  await deleteToDo(fastify, id)
  const toDoDeleted: ToDo = await getToDoById(fastify, id)
  t.notOk(toDoDeleted)
})