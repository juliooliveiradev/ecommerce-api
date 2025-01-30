import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from './order.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { Repository } from 'typeorm';

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let mockRepo: Repository<Order>;

  beforeEach(async () => {
    const mockOrderRepository = {
      create: jest.fn().mockResolvedValue({
        id: '123',
        product: 'Laptop Gamer',
        quantity: 1,
        price: 5000,
        customerName: 'Julio',
        customerEmail: 'julio@email.com',
        status: OrderStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        processedAt: null,
      }),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    repository = module.get<OrderRepository>(OrderRepository);
    mockRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should create an order', async () => {
    const orderData = {
      product: 'Laptop Gamer',
      quantity: 1,
      price: 5000,
      customerName: 'Julio',
      customerEmail: 'julio@email.com',
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      processedAt: null,
    };

    jest.spyOn(mockRepo, 'save').mockResolvedValue(orderData as Order);

    const result = await repository.create(orderData);
    expect(result).toEqual(orderData);
  });
});
