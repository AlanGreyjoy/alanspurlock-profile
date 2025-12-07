import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';
import { Prisma } from '@prisma/client';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceRepo: ExperienceRepository) {}

  @Get()
  async findAll() {
    return this.experienceRepo.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.experienceRepo.findById(id);
  }

  @Post()
  async create(@Body() data: Prisma.ExperienceCreateInput) {
    return this.experienceRepo.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ExperienceUpdateInput
  ) {
    return this.experienceRepo.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.experienceRepo.delete(id);
  }
}
