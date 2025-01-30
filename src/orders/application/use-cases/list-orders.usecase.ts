import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(filters: { status?: string; startDate?: string; endDate?: string }): Promise<Order[]> {
    const { status, startDate, endDate } = filters;

    if (status) {
      
      const enumStatus = status as Order['status'];
      return this.orderRepository.findByStatus(enumStatus);
    }

    if (startDate && endDate) {
      return this.orderRepository.findByDateRange(startDate, endDate);
    }

    
    return this.orderRepository.findByStatus('Pendente'); 
  }
}
