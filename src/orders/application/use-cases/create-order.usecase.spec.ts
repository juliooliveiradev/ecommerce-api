import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUseCase } from './create-order.usecase';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { getQueueToken } from '@nestjs/bull';

describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let repository: OrderRepository;
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        {
          provide: OrderRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '123',
              product: 'Laptop Gamer',
              quantity: 1,
              price: 5000,
              customerName: 'Julio',
              customerEmail: 'julio@email.com',
              status: 'PENDING',
              createdAt: new Date(),
              updatedAt: new Date(),
              processedAt: null,
            }),
            save: jest.fn().mockResolvedValue({
              id: '123',
              product: 'Laptop Gamer',
              quantity: 1,
              price: 5000,
              customerName: 'Julio',
              customerEmail: 'julio@email.com',
              status: 'PENDING',
              createdAt: new Date(),
              updatedAt: new Date(),
              processedAt: null,
            }),
          },
        },
        {
          provide: getQueueToken('order-queue'),
          useValue: {
            add: jest.fn().mockResolvedValue({ id: '123', data: {} }),
            name: 'order-queue',
            client: {},
            isReady: jest.fn(),
            process: jest.fn(),  
          } as any,
        },
      ],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    repository = module.get<OrderRepository>(OrderRepository);
  });

  it('should create an order and return it', async () => {
    const orderData: Partial<Order> = {
      product: 'Laptop Gamer',
      quantity: 1,
      price: 5000,
      customerName: 'Julio',
      customerEmail: 'julio@email.com',
    };

    jest.spyOn(repository, 'create').mockResolvedValue(orderData as Order);
    

    const result = await useCase.execute(orderData);
    expect(result).toEqual(orderData);
    expect(repository.create).toHaveBeenCalledWith(orderData);
  });
});
