import { Game } from '../../game/entities/game.entity';
import { User } from '../../user/entities/user.entity';

export class Profile {
    id?: string;
    title: string;
    imageUrl: string;
    user?: User;
    game?: Game[];
}
