import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { PersonalInfoRepository } from './personal-info.repository';
import { Prisma } from '@prisma/client';

@Controller('personal-info')
export class PersonalInfoController {
  constructor(private readonly personalInfoRepo: PersonalInfoRepository) {}

  @Get()
  async find() {
    return this.personalInfoRepo.find();
  }

  @Post()
  async create(@Body() data: Prisma.PersonalInfoCreateInput) {
    return this.personalInfoRepo.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.PersonalInfoUpdateInput
  ) {
    return this.personalInfoRepo.update(id, data);
  }
}
