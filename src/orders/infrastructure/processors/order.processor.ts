import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/orders/domain/entities/order.entity';
import { OrderRepository } from 'src/orders/domain/repositories/order.repository';

@Processor('order-queue') 
@Injectable()
export class OrderProcessor {
  constructor(private readonly orderRepository: OrderRepository) {}

  @Process('process-order') 
  async handleOrder(job: Job) {
    const orderId = job.data.orderId;

    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = OrderStatus.PROCESSED;
    order.processedAt = new Date();

    await this.orderRepository.update(order);

    console.log(`Order ${orderId} processed successfully`);
  }
}
