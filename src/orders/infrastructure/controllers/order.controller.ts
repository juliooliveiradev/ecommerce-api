import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { ProcessOrderUseCase } from '../../application/use-cases/process-order.usecase';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOrderDto } from '../../domain/dto/create-order-dto';
import { Order, OrderStatus } from 'src/orders/domain/entities/order.entity';

@ApiTags('orders') 
@Controller('orders')
export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private processOrderUseCase: ProcessOrderUseCase,
    private orderRepository: OrderRepository,
    @InjectQueue('order-queue') private orderQueue: Queue
  ) {}

  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
  })
  @Post()
  async createOrder(@Body() orderData: CreateOrderDto) {
    
    if (orderData.status) {
      const trimmedStatus = orderData.status.trim() as OrderStatus;
      
      
      if (!Object.values(OrderStatus).includes(trimmedStatus)) {
        throw new Error(`Status inválido: ${trimmedStatus}`);
      }
  
      orderData.status = trimmedStatus;
    }

    const order = await this.createOrderUseCase.execute(orderData);

    
    await this.orderQueue.add({ orderId: order.id });

    return order;
  }

  @ApiOperation({ summary: 'Obtém todos os pedidos com filtro' })
  @ApiResponse({
    status: 200,
    description: 'Pedidos retornados com sucesso',
    type: [Order],
  })
  @Get()
  async getOrders(
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    if (status) return this.orderRepository.findByStatus(status.trim());
    if (startDate && endDate) return this.orderRepository.findByDateRange(startDate, endDate);
    return this.orderRepository.findByStatus('Pendente');
  }
}
