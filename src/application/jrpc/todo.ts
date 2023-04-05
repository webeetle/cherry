import {FastifyPluginAsync} from "fastify"
import {ToDoToInsert, ToDoToUpdate, sToDo, sToDoInsert, sToDoToUpdate} from "../../core/entities/todo/ToDo";
import {deleteToDo, getAllTodos, getToDoById, insertToDo, updateToDo} from "../../core/usecases/todo/todoUseCases";

const jrpcExample: FastifyPluginAsync = async (fastify): Promise<void> => {

    fastify.jrpc.addMethod({
        "name": "ping",
        "description": "responde pong",
        "params": [],
        "result": {
            "name": "response",
            "description": "The response to the ping request",
            "schema": {
                "type": "string"
            }
        }
    }, () => {
        return 'pong'
    });

    fastify.jrpc.addMethod({
        "name": "hi",
        "description": "say hi",
        "params": [
            {
                "name": "person",
                "description": "The person to greet",
                "schema": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "age": {
                            "type": "integer",
                            "minimum": 1
                        }
                    },
                    "required": [
                        "name"
                    ],
                    "additionalProperties": false
                }
            }
        ],
        "result": {
            "name": "greeting",
            "description": "The greeting",
            "schema": {
                "type": "string"
            }
        }
    }, (person: unknown) => {
        // @ts-ignore
        return "hi " + person.name;
    });

    fastify.jrpc.addMethod({
        "name": "getTodos",
        "description": "Get all todos",
        "params": [],
        "result": {
            "name": "todos",
            "description": "The todos",
            "schema": {
                "type": "array",
                "items": sToDo
            }
        }
    }, async () => {
        return getAllTodos(fastify)
    });
    
    fastify.jrpc.addMethod({
        "name": "getTodo",
        "description": "Get todo by id",
        "params": [
            {
                "name": "id",
                "description": "The id of the todo",
                "schema": {
                    "type": "string"
                }
            }
        ],
        "result": {
            "name": "todo",
            "description": "The todo",
            "schema": sToDo
        }
    }, async (id: string) => {
        return getToDoById(fastify, id)
    });

    fastify.jrpc.addMethod({
        "name": "insertTodo",
        "description": "Insert todo",
        "params": [
            {
                "name": "todo",
                "description": "The todo to insert",
                "schema": sToDoInsert
            }
        ],
        "result": {
            "name": "lastInsertedId",
            "description": "The id of the last inserted todo",
            "schema": {
                "type": "string"
            }
        }
    }, async (todo: ToDoToInsert) => {
        return {lastInsertedId: await insertToDo(fastify, todo)}
    });

    fastify.jrpc.addMethod({
        "name": "updateTodo",
        "description": "Update todo",
        "params": [
            {
                "name": "id",
                "description": "The id of the todo to update",
                "schema": {
                    "type": "string"
                }
            },
            {
                "name": "todo",
                "description": "The todo to update",
                "schema": sToDoToUpdate
            }
        ],
        "result": {
            "name": "todo",
            "description": "The updated todo",
            "schema": sToDo
        }
    }, async (id: string, todo: ToDoToUpdate) => {
        return updateToDo(fastify, id, todo)
    });
    
    fastify.jrpc.addMethod({
        "name": "deleteTodo",
        "description": "Delete todo",
        "params": [
            {
                "name": "id",
                "description": "The id of the todo to delete",
                "schema": {
                    "type": "string"
                }
            }
        ],
        "result": {}
    }, async (id: string) => {
        await deleteToDo(fastify, id)
    });
}

export default jrpcExample;
