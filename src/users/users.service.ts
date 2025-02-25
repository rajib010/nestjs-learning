import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1001',
      name: 'rajib pokhrel',
      email: 'pokhrelrajib016@gmail.com',
      role: 'Admin',
    },
    {
      id: '1002',
      name: 'rupesh pokhrel',
      email: 'pokhrelrupesh016@gmail.com',
      role: 'Engineer',
    },
    {
      id: '1003',
      name: 'rachit pokhrel',
      email: 'pokhrelrachit16@gmail.com',
      role: 'Intern',
    },
    {
      id: '1004',
      name: 'sabina pokhrel',
      email: 'pokhrelsabina016@gmail.com',
      role: 'Intern',
    },
  ];

  findAll(role?: 'Admin' | 'Intern' | 'Engineer') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role?: 'Intern' | 'Engineer' | 'Admin';
  }) {
    const userByhighestId = [...this.users].sort(
      (a, b) => Number(b.id) - Number(a.id),
    );

    const newUser = {
      id: (Number(userByhighestId[0].id) + 1).toString(),
      name: user.name,
      email: user.email,
      role: user.role ?? '',
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(
    id: string,
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'Intern' | 'Engineer' | 'Admin';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteUser(id: string) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
