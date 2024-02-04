import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.prisma.user.findFirst({where: {email: createUserDto.email}});

    if (foundUser) {
      throw new ConflictException('User already registered');
    }

    const user = this.prisma.user.create({data: createUserDto})
    return plainToInstance(User, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: {id}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({where: {email}});
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({where: {id}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({where: {id}, data: updateUserDto})
    return plainToInstance(User, updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({where: {id}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({where: {id}});
  }
}
