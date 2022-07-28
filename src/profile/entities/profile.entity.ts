import { Game } from '../../games/entities/game.entity';
import { User } from '../../user/entities/user.entity';

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  user?: User;
  games?: Game[];
  favoriteGames?: Game[];
}
