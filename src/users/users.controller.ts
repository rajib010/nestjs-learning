import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() //return all the users
  findAll() {
    return ' all the users are found';
  }

  @Get(':id') //return specific user
  findOne(@Param('id') id: String) {
    return 'User with id found';
  }

  @Post()
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string) {
    return 'updated user';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: String) {
    return 'user deleted successfully';
  }
}
