import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { SkillsRepository } from './skills.repository';
import { Prisma } from '@prisma/client';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsRepo: SkillsRepository) {}

  @Get()
  async findAll() {
    return this.skillsRepo.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.skillsRepo.findById(id);
  }

  @Post()
  async create(@Body() data: Prisma.SkillCreateInput) {
    return this.skillsRepo.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.SkillUpdateInput) {
    return this.skillsRepo.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.skillsRepo.delete(id);
  }
}
