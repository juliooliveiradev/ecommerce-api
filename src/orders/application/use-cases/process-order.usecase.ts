import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderStatus } from '../../domain/entities/order.entity';

@Processor('order-queue')
export class ProcessOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  @Process()
  async handle(job: Job) {
    const { orderId } = job.data;

        const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error(`Pedido com ID ${orderId} não encontrado.`);
    }

    
    order.status = OrderStatus.PROCESSED;
    order.processedAt = new Date();

        await this.orderRepository.update(order);

    console.log(` Pedido ${orderId} processado com sucesso.`);
  }
}

