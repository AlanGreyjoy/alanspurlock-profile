import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ExperienceRepository } from './experience/experience.repository';
import { EducationRepository } from './education/education.repository';
import { SkillsRepository } from './skills/skills.repository';
import { PersonalInfoRepository } from './personal-info/personal-info.repository';
import { ResumeDownloadsRepository } from './resume-downloads/resume-downloads.repository';
import { ExperienceController } from './experience/experience.controller';
import { EducationController } from './education/education.controller';
import { SkillsController } from './skills/skills.controller';
import { PersonalInfoController } from './personal-info/personal-info.controller';
import { ResumeDownloadsController } from './resume-downloads/resume-downloads.controller';

@Global()
@Module({
  providers: [
    DatabaseService,
    ExperienceRepository,
    EducationRepository,
    SkillsRepository,
    PersonalInfoRepository,
    ResumeDownloadsRepository,
  ],
  controllers: [
    ExperienceController,
    EducationController,
    SkillsController,
    PersonalInfoController,
    ResumeDownloadsController,
  ],
  exports: [
    DatabaseService,
    ExperienceRepository,
    EducationRepository,
    SkillsRepository,
    PersonalInfoRepository,
    ResumeDownloadsRepository,
  ],
})
export class DatabaseModule {}
