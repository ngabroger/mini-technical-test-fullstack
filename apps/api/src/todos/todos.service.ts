import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Like, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ){}

    async findAll(search?: string): Promise<Todo[]>{
        if (search){
            return this.todosRepository.find({
                where: {title: Like(`%${search}%`)},
                order: {id: 'DESC'}
            })
        }
        return this.todosRepository.find({order: {id: 'DESC'}});
    }

    create(createTodoDto: CreateTodoDto): Promise <Todo>{
        const todo = this.todosRepository.create(createTodoDto);
        return this.todosRepository.save(todo);
    }

    findOne(id: number): Promise<Todo | null>{
        return this.todosRepository.findOneBy({id});
    }

    remove(id: number): Promise<void>{
        return this.todosRepository.delete(id).then(() => undefined);
    }

    async update(id:number, updateTodoDto: UpdateTodoDto): Promise<Todo | null>{
        await this.todosRepository.update(id, updateTodoDto);
        return this.todosRepository.findOneBy({id});
    }
}
