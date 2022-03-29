import { JwtAuthGuard } from './../../auth/guards/jwt-guard';
import { hasRoles } from './../../auth/decorator/roles.decorator';
import { User, UserRole } from './../models/user.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './../service/user.service';
import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // CRUD CONTROLLER
    @Post()
    create(@Body() user: User): Observable< User | Object>{   
        return this.userService.create(user).pipe( 
            map((user: User) => user),
            catchError(err => of({error: err.message}))
            );   
        }


    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt};
            }
        ))
    }
    @Get(':id')
    findOne(@Param() params): Observable<User> { return this.userService.findOne(params.id); }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll(): Observable<User[]> { return this.userService.findAll(); }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User> { return this.userService.deleteOne(Number(id)); }

    @Put(':id')
    UpdateOne(@Param('id') id: string, @Body() user: User): Observable<User> { return this.userService.updateOne(Number(id), user); }

}