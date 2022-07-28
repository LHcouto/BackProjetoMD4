import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './games/game.module';
import { GenreModule } from './genre/genre.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { HomepageModule } from './homepage/homepage.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [GameModule, GenreModule, PrismaModule, ProfileModule, UserModule, HomepageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
