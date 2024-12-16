import { Injectable } from '@nestjs/common';
import { NotiDto } from './dto/noti.dto';
import { EmailService } from './email/email.service';
import { FcmService } from './fcm/fcm.service';
import { SmsService } from './sms/sms.service';

@Injectable()
export class AppService {
  constructor(
    private readonly emailService: EmailService,
    private readonly fcmService: FcmService,
    private readonly smsService: SmsService,
  ) {}

  handleSendEmail(notiDto: NotiDto) {
    console.log('Handle send email! ', NotiDto);
    return this.emailService.sendMailToUser('mrdauisme@gmail.com');
  }

  handlePushNoti(notiDto: NotiDto) {
    console.log('Handle push noti! ', NotiDto);
    return this.fcmService.sendMessage('');
  }

  handleSendSms(notiDto: NotiDto) {
    console.log('Send sms ', NotiDto);
    const message = 'SMS sent';
    const number = '+84857370709';
    return this.smsService.sendSms(number, message);
  }
}
