import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { XUserIdGuard } from 'src/x-user-id.guard';


@UseGuards(XUserIdGuard)
@Controller('api/todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}

    @Get()
    findAll(@Query('search') search?: string){
        return this.todosService.findAll(search);
    }

    @Post()
    create(@Body() CreateTodoDto: CreateTodoDto){
        return this.todosService.create(CreateTodoDto);
    }

    @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(Number(id), updateTodoDto);
  }
}
