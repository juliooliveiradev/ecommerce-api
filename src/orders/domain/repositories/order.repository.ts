import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repo.create(order); 
    return await this.repo.save(newOrder); 
  }
  

  async findByStatus(status: string): Promise<Order[]> {
    const trimmedStatus = status.trim() as OrderStatus;
  
    
    if (!Object.values(OrderStatus).includes(trimmedStatus)) {
      throw new Error(`Status inválido: ${trimmedStatus}`);
    }
  
    return this.repo.find({ where: { status: trimmedStatus } });
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Order[]> {
    return this.repo.createQueryBuilder('order')
      .where('order.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();
  }

  async findById(id: number): Promise<Order | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(order: Order): Promise<Order> {
    return this.repo.save(order);
  }
}
