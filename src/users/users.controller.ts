import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() //get all the users
  findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin') {
    return this.userService.findAll(role);
  }

  @Get(':id') //return specific user
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post() //create a new user
  create(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id') //update the user based on provided id
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDTO,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id') //delete the user
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
