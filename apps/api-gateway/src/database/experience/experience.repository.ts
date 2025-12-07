import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Experience, Prisma } from '@prisma/client';

@Injectable()
export class ExperienceRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Experience[]> {
    return this.db.experience.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string): Promise<Experience | null> {
    return this.db.experience.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ExperienceCreateInput): Promise<Experience> {
    return this.db.experience.create({ data });
  }

  async update(
    id: string,
    data: Prisma.ExperienceUpdateInput
  ): Promise<Experience> {
    return this.db.experience.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Experience> {
    return this.db.experience.delete({
      where: { id },
    });
  }
}
