import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DlxService } from './dlx/dlx.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { FcmModule } from './fcm/fcm.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
    FcmModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DlxService],
})
export class AppModule {}
