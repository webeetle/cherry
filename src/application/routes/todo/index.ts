import {FastifyPluginAsync} from "fastify"
import {sToDo, sToDoInsert, ToDo, ToDoToInsert, ToDoToUpdate} from "../../../core/entities/todo/ToDo";
import {deleteToDo, getAllTodos, getToDoById, insertToDo, updateToDo} from "../../../core/usecases/todo/todoUseCases";
import {HttpError} from "@fastify/sensible/lib/httpError";

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('',
    {
      schema: {
        tags: ['To Do'],
        description: 'Get all todos',
        response: {
          200: {
            type: 'array',
            items: sToDo
          }
        }
      }
    },
    async function (): Promise<ToDo[]> {
      return getAllTodos(fastify)
    })

  fastify.get<{ Params: { id: string } }>('/:id',
    {
      schema: {
        tags: ['To Do'],
        description: 'Get all todos',
        params: {
          type: 'object',
          properties: {
            id: {type: 'string'}
          }
        },
        response: {
          200: sToDo
        }
      }
    },
    async function (request): Promise<ToDo | HttpError> {
      const todo = await getToDoById(fastify, request.params.id)
      if (!todo) {
        return fastify.httpErrors.notFound()
      }
      return todo
    })

  fastify.post<{ Body: ToDoToInsert }>('',
    {
      schema: {
        tags: ['To Do'],
        description: 'Insert todo',
        body: sToDoInsert,
        response: {
          200: {
            type: 'object',
            properties: {
              lastInsertedId: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    async function (request): Promise<{ lastInsertedId: string }> {
      console.log(request.body)
      return {lastInsertedId: await insertToDo(fastify, request.body)}
    })

  fastify.put<{ Body: ToDoToUpdate, Params: { id: string } }>('/:id',
    {
      schema: {
        tags: ['To Do'],
        description: 'Update todo',
        body: sToDoInsert,
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            }
          }
        },
        response: {
          200: sToDo
        }
      }
    },
    async function (request): Promise<ToDo> {
      return updateToDo(fastify, request.params.id, request.body)
    })

  fastify.delete<{ Params: { id: string } }>('/:id',
    {
      schema: {
        tags: ['To Do'],
        description: 'Update todo',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            }
          }
        },
        response: {
          204: {type: 'null'}
        }
      }
    },
    async function (request, reply): Promise<void> {
      await deleteToDo(fastify, request.params.id)
      reply.status(204).send()
    })
}

export default example;
