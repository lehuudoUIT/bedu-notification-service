import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class DlxService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private readonly configService: ConfigService) {}
  private readonly rabbitMQUrl = this.configService.getOrThrow('RMQ_URL');
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onApplicationBootstrap() {
    await this.setupDeadLetterQueueConsumer();
  }

  async onApplicationShutdown() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  private async setupDeadLetterQueueConsumer() {
    this.connection = await amqp.connect(this.rabbitMQUrl);
    this.channel = await this.connection.createChannel();

    // const dlxQueue = 'dead-letter-queue';
    const notiExchangeDLX = 'dead-letter-exchange';
    const notiQueueDLX = 'notiQueueDLX';
    const notiRoutingKeyDLX = 'dead-letter-routing-key';

    try {
      await this.channel.assertExchange(notiExchangeDLX, 'topic');
      await this.channel.assertQueue(notiQueueDLX);

      await this.channel.bindQueue(
        notiQueueDLX,
        notiExchangeDLX,
        notiRoutingKeyDLX,
      );
      await this.channel.consume(notiQueueDLX, (msg) => {
        console.log('!!!HOT FIX, HOTFIX');
        console.log(':::msgDLX: ', msg.content.toString());
        this.channel.ack(msg);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
