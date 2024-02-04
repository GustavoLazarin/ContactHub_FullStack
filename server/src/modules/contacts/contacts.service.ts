import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Contact } from './entities/contact.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}
  async create(userId: string, createContactDto: CreateContactDto) {
    const foundContact = await this.prisma.contact.findFirst({where: {email: createContactDto.email, user_id: userId}});

    if (foundContact) {
      throw new ConflictException('Contact already registered');
    }

    const contact = this.prisma.contact.create({data: {
      name: createContactDto.name,
      email: createContactDto.email,
      phone_number: createContactDto.phone_number,
      user: {connect: {id: userId}},
      type: createContactDto.type
    }, include: {user: {select: {email: true}}}})

    return contact;
  }

  async findAll(userId: string) {
    const contacts = await this.prisma.contact.findMany({where: {user_id: userId}, include: {user: {select: {email: true}}}});
    return plainToInstance(Contact, contacts);
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({where: {id}, include: {user: {select: {email: true}}}});

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return plainToInstance(Contact, contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({where: {id}});

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    const updatedContact = await this.prisma.contact.update({where: {id}, data: updateContactDto, include: {user: {select: {email: true}}}})
    return plainToInstance(Contact, updatedContact);
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({where: {id}});

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.prisma.contact.delete({where: {id}});
  }
}
