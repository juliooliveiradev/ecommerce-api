import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository, 
    @InjectQueue('order-queue') private orderQueue: Queue, 
  ) {}

  async execute(orderData: Partial<Order>): Promise<Order> {
    
    const order = await this.orderRepository.create(orderData);

    
    await this.orderQueue.add({ orderId: order.id });

    return order; 
  }
}
