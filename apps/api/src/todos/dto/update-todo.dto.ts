import {IsIn, IsOptional, IsString} from 'class-validator';
import type { TodoStatus } from '../todos.entity';


export class UpdateTodoDto{
    @IsOptional()
    @IsIn(['created', 'completed', 'on_going', 'problem'])
    status?: TodoStatus;

    @IsOptional()
    @IsString()
    problem_desc?: string;
}