import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Skill, Prisma } from '@prisma/client';

@Injectable()
export class SkillsRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Skill[]> {
    return this.db.skill.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string): Promise<Skill | null> {
    return this.db.skill.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.db.skill.create({ data });
  }

  async update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
    return this.db.skill.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Skill> {
    return this.db.skill.delete({
      where: { id },
    });
  }
}
