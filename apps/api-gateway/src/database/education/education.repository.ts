import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Education, Prisma } from '@prisma/client';

@Injectable()
export class EducationRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Education[]> {
    return this.db.education.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string): Promise<Education | null> {
    return this.db.education.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.EducationCreateInput): Promise<Education> {
    return this.db.education.create({ data });
  }

  async update(
    id: string,
    data: Prisma.EducationUpdateInput
  ): Promise<Education> {
    return this.db.education.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Education> {
    return this.db.education.delete({
      where: { id },
    });
  }
}
