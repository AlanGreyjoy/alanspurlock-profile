import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { PersonalInfo, Prisma } from '@prisma/client';

@Injectable()
export class PersonalInfoRepository {
  constructor(private readonly db: DatabaseService) {}

  async find(): Promise<PersonalInfo | null> {
    // Get the first (and should be only) personal info record
    return this.db.personalInfo.findFirst();
  }

  async create(data: Prisma.PersonalInfoCreateInput): Promise<PersonalInfo> {
    return this.db.personalInfo.create({ data });
  }

  async update(
    id: string,
    data: Prisma.PersonalInfoUpdateInput
  ): Promise<PersonalInfo> {
    return this.db.personalInfo.update({
      where: { id },
      data,
    });
  }
}
