import { ITodo } from './../types/todo'
import Todo from './../models/todo'

interface TodoRepo {
    getTodos(): Promise<Array<ITodo>>
    addTodo(todoBody: ITodo): Promise<ITodo>
    updateTodo(id: string, todoBody: ITodo): Promise<ITodo | null>
    deleteTodo(id: string): Promise<ITodo | null>
}

class TodoRepoImpl implements TodoRepo {
    private constructor() { }

    static of(): TodoRepoImpl {
        return new TodoRepoImpl()
    }
    
    // CRUD增刪查改，Create 建立, Read 讀取 查詢, Update 更新 改正, Delete 刪除
    // 這邊是說明根據request呼叫不同的函數，對資料庫的資料做不同的處理
    // 寫進資料庫

    async getTodos(): Promise<Array<ITodo>> {
        // TODO: Should get Todo from mongoDB
        return Todo.find()  // finds all todos
    }

    // TODO: Should add Todo into mongoDB
    async addTodo(todoBody: ITodo): Promise<ITodo> {
        return Todo.create(todoBody)
    }

    async updateTodo(id: string, todoBody: ITodo): Promise<ITodo | null> {
        // TODO: Should update Todo to mongoDB
        return Todo.findByIdAndUpdate(id, todoBody)  // correspond by id to replace with todoBody
    }

    async deleteTodo(id: string): Promise<ITodo | null> {
        // TODO: Should delete Todo from mongoDB
        return Todo.findByIdAndDelete(id)  // correspond by id and delete it
    }

}

export { TodoRepoImpl }
