import { User } from './../models/user.interface';
import { Observable } from 'rxjs';
import { UserService } from './../service/user.service';
import { Body, Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // CRUD CONTROLLER
    @Post()
    create(@Body() user: User): Observable<User> {   return this.userService.create(user);   }

    @Get(':id')
    findOne(@Param() params): Observable<User> { return this.userService.findOne(params.id); }

    @Get()
    findAll(): Observable<User[]> { return this.userService.findAll(); }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User> { return this.userService.deleteOne(Number(id)); }

    @Put(':id')
    UpdateOne(@Param('id') id: string, @Body() user: User): Observable<User> { return this.userService.updateOne(Number(id), user); }

}

