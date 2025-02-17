import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITodo } from '../types/todo'
import { TodoRepoImpl } from './../repo/todo-repo'

const TodoRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const todoRepo = TodoRepoImpl.of()

    interface IdParam {
        id: string
    }

    // TODO: Add CRUD endpoints, i.e. get(read), post(create), update(update), delete(delete)
    // NOTE: the url should be RESTful (url裡的名詞用複數，像todos)
    // 這邊是告訴伺服器遇到不同的request要回傳甚麼訊息
    // 200 --> get OK
    // 201 --> create
    // 404 --> not found
    // 500 --> server error
    server.get('/todos', opts, async (request, reply) => {
        try {
            const todos: Array<ITodo> = await todoRepo.getTodos()  // get --> getTodos
            return reply.status(200).send({ todos })
        } catch (error) {
            console.error(`GET /todos Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })
    
    server.post('/todos', opts, async (request, reply) => {
        try {
            const todoBody: ITodo = request.body as ITodo
            const todo: ITodo = await todoRepo.addTodo(todoBody)  // post --> addTodo
            return reply.status(201).send({ todo })
        } catch (error) {
            console.error(`POST /todos Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })
    
    server.put<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
        try {
            const id = request.params.id
            const todoBody = request.body as ITodo
            const todo: ITodo | null = await todoRepo.updateTodo(id, todoBody)  // put --> updateTodo
            if (todo) {
                return reply.status(200).send({ todo })
            } else {
                return reply.status(404).send({ msg: `Not Found Todo:${id}` })
            }
        } catch (error) {
            console.error(`PUT /todos/${request.params.id} Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })
    
    server.delete<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
        try {
            const id = request.params.id
            const todo: ITodo | null = await todoRepo.deleteTodo(id)  // delete --> deleteTodo
            if (todo) {
                return reply.status(204).send()
            } else {
                return reply.status(404).send({ msg: `Not Found Todo:${id}` })
            }
        } catch (error) {
            console.error(`DELETE /todos/${request.params.id} Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })


    done()
}

export { TodoRouter }
