import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:30052004@localhost'],
        queue: 'noti_queue',
        queueOptions: {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': 'dead-letter-exchange', // DLX name
            'x-dead-letter-routing-key': 'dead-letter-routing-key', // Routing key for DLX
            // 'x-message-ttl': 10000, // TTL (optional)
            // 'x-expires': 10000,
          },
        },
        noAck: false,
      },
    },
  );

  await app.listen();
}
bootstrap();
