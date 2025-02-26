import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1001,
      name: 'rajib pokhrel',
      email: 'pokhrelrajib016@gmail.com',
      role: 'Admin',
    },
    {
      id: 1002,
      name: 'rupesh pokhrel',
      email: 'pokhrelrupesh016@gmail.com',
      role: 'Engineer',
    },
    {
      id: 1003,
      name: 'rachit pokhrel',
      email: 'pokhrelrachit16@gmail.com',
      role: 'Intern',
    },
    {
      id: 1004,
      name: 'sabina pokhrel',
      email: 'pokhrelsabina016@gmail.com',
      role: 'Intern',
    },
  ];

  findAll(role?: 'Admin' | 'Intern' | 'Engineer') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (!roleArray.length)
        throw new NotFoundException(`No users found with the ${role} role.`);
      return roleArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDTO) {
    const userByhighestId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );

    const newUser = {
      id: Number(userByhighestId[0].id) + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
