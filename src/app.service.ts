import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Serve is running! 🚀 \n Please check -> http://localhost:3333/api for swagger docs `;
  }
}
