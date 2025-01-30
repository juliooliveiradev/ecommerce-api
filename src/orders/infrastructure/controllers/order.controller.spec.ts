import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { ProcessOrderUseCase } from '../../application/use-cases/process-order.usecase';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Queue } from 'bull';
import { CreateOrderDto } from '../../domain/dto/create-order-dto';
import { getQueueToken } from '@nestjs/bull';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { Job } from 'bull';

describe('OrderController', () => {
  let orderController: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let processOrderUseCase: ProcessOrderUseCase;
  let orderRepository: OrderRepository;
  let orderQueue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CreateOrderUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ProcessOrderUseCase,
          useValue: {},
        },
        {
          provide: OrderRepository,
          useValue: { 
            findByStatus: jest.fn(),
            findByDateRange: jest.fn()
          },
        },
        {
          provide: getQueueToken('order-queue'),
          useValue: { add: jest.fn().mockResolvedValue({} as Job) },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    processOrderUseCase = module.get<ProcessOrderUseCase>(ProcessOrderUseCase);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    orderQueue = module.get<Queue>(getQueueToken('order-queue'));
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order and add to queue', async () => {
      const orderData: CreateOrderDto = {
          product: 'Product',
          quantity: 2,
          price: 100,
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          status: OrderStatus.PENDING
      };
      const createdOrder: Order = { 
        id: 123, 
        ...orderData, 
        status: OrderStatus.PENDING, 
        createdAt: new Date(), 
        processedAt: null, 
        updatedAt: new Date() 
      };
      
      jest.spyOn(createOrderUseCase, 'execute').mockResolvedValue(createdOrder);
      jest.spyOn(orderQueue, 'add').mockResolvedValue({} as Job);
      
      const result = await orderController.createOrder(orderData);
      
      expect(createOrderUseCase.execute).toHaveBeenCalledWith(orderData);
      expect(orderQueue.add).toHaveBeenCalledWith({ orderId: createdOrder.id });
      expect(result).toEqual(createdOrder);
    });
  });

  describe('getOrders', () => {
    it('should return orders by status', async () => {
      const orders: Order[] = [{
        id: 123 , 
        product: 'Product', 
        quantity: 1, 
        price: 50, 
        customerName: 'Alice', 
        customerEmail: 'alice@example.com', 
        status: OrderStatus.PENDING, 
        createdAt: new Date(), 
        processedAt: null, 
        updatedAt: new Date()
      }];
      jest.spyOn(orderRepository, 'findByStatus').mockResolvedValue(orders);
      
      const result = await orderController.getOrders('Pendente');
      
      expect(orderRepository.findByStatus).toHaveBeenCalledWith('Pendente');
      expect(result).toEqual(orders);
    });

    it('should return orders by date range', async () => {
      const orders: Order[] = [{
        id: 123, 
        product: 'Product', 
        quantity: 1, 
        price: 50, 
        customerName: 'Alice', 
        customerEmail: 'alice@example.com', 
        status: OrderStatus.PENDING, 
        createdAt: new Date(), 
        processedAt: null, 
        updatedAt: new Date()
      }];
      jest.spyOn(orderRepository, 'findByDateRange').mockResolvedValue(orders);
      
      const result = await orderController.getOrders(undefined, '2023-01-01', '2023-01-31');
      
      expect(orderRepository.findByDateRange).toHaveBeenCalledWith('2023-01-01', '2023-01-31');
      expect(result).toEqual(orders);
    });
  });
});