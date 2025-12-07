import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from '../resume/resume.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger';

@Module({
  imports: [LoggerModule, DatabaseModule, ResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
