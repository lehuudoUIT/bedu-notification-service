import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';
@Injectable()
export class SmsService {
  private readonly client: twilio.Twilio;

  constructor(private readonly configService: ConfigService) {
    this.client = twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendSms(to: string, message: string): Promise<any> {
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');

    try {
      const result = await this.client.messages.create({
        body: message,
        from,
        to,
      });

      return result;
    } catch (error) {
      throw new Error('Failed to send SMS: ' + error.message);
    }
  }
}
