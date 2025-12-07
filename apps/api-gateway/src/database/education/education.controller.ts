import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { EducationRepository } from './education.repository';
import { Prisma } from '@prisma/client';

@Controller('education')
export class EducationController {
  constructor(private readonly educationRepo: EducationRepository) {}

  @Get()
  async findAll() {
    return this.educationRepo.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.educationRepo.findById(id);
  }

  @Post()
  async create(@Body() data: Prisma.EducationCreateInput) {
    return this.educationRepo.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.EducationUpdateInput
  ) {
    return this.educationRepo.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.educationRepo.delete(id);
  }
}
