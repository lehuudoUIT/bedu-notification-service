import { Injectable } from '@nestjs/common';
import { CreateFcmDto } from './dto/create-fcm.dto';
import { UpdateFcmDto } from './dto/update-fcm.dto';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
@Injectable()
export class FcmService {
  constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n'); // Handle newline characters in private key

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  sendMessage(createFcmDto: CreateFcmDto) {
    // handle send message
    return 'This action adds a new fcm';
  }

  broadcastMessage() {
    // handle broadcast message
    return `This action returns all fcm`;
  }
}
