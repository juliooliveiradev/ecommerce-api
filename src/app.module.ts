import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { OrderModule } from './orders/order.module';
import { DatabaseModule } from './orders/infrastructure/providers/database.module'; // Importando o DatabaseModule
import { config } from 'dotenv';


config(); 
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        maxRetriesPerRequest: null, 
        enableReadyCheck: false,
      },
    }),
    DatabaseModule, 
    OrderModule,
  ],
})
export class AppModule {}