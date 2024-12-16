import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerSerivce: MailerService) {}

  async sendMailToUser(to: string) {
    try {
      to = to ? to : 'mrdauisme@gmail.com';
      return await this.mailerSerivce.sendMail({
        to,
        subject: 'Test Email from Mailtrap',
        text: 'This is a plain text body of the email.',
        html: '<p>This is the HTML body of the email.</p>',
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
