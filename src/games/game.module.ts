import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { GameController } from "./game.controler";
import { GameService } from "./game.service";

@Module({
  imports: [PrismaModule,PassportModule.register({defaultStrategy: 'jwt'}),],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule{}
