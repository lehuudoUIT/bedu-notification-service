import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotiDto } from './dto/noti.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('notification.email')
  async handleEmailNotiEvent(
    @Payload() notiDto: NotiDto,
    @Ctx() context: RmqContext,
  ) {
    const message = context.getMessage();
    const channel = context.getChannelRef();
    console.log('::: Sent to queue email');
    channel.ack(message);
    return;
    try {
      const payload = await this.appService.handleSendEmail(notiDto);

      if (payload) {
        console.log('::::payload: ');
        console.log(payload);

        channel.ack(message);
      } else {
        channel.nack(message, false, false);
      }
    } catch (error) {
      channel.nack(message, false, false);
      console.log('Error handle email event:', error);
    }
  }

  @EventPattern('notification.sms')
  async handleSMSNotiEvent(
    @Payload() notiDto: NotiDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    console.log('::: Sent to queue sms');
    channel.ack(message);
    return;

    try {
      const payload = await this.appService.handleSendSms(notiDto);

      if (payload) {
        console.log('::::payload: ');
        console.log(payload);

        channel.ack(message);
      } else {
        channel.nack(message, false, false);
      }
    } catch (error) {
      channel.nack(message, false, false);
      console.log('Error handle email event:', error);
    }
  }

  @EventPattern('notification.push')
  async handlePushNotiEvent(
    @Payload() notiDto: NotiDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    // channel.nack(originalMessage, false, false);
    console.log('::: Sent to queue push');
    channel.ack(message);
    return;

    channel.ack(message);

    return this.appService.handlePushNoti(notiDto);
  }
}
