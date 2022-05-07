import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [PeopleModule, PrismaModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
