import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { Order } from './domain/entities/order.entity';
import { OrderRepository } from './domain/repositories/order.repository';
import { CreateOrderUseCase } from './application/use-cases/create-order.usecase';
import { ListOrdersUseCase } from './application/use-cases/list-orders.usecase';
import { ProcessOrderUseCase } from './application/use-cases/process-order.usecase';

import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderProcessor } from './infrastructure/processors/order.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), 
    BullModule.registerQueue({
      name: 'order-queue', 
    }),
  ],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,
    OrderRepository,
    ListOrdersUseCase,
    ProcessOrderUseCase,
    OrderProcessor,
  ],
})
export class OrderModule {}
