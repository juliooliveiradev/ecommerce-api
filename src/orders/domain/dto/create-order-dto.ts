import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nome do produto no pedido',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'Quantidade do produto no pedido',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Preço do produto no pedido',
    example: 2000,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Nome do cliente que fez o pedido',
    example: 'Julio',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Email do cliente que fez o pedido',
    example: 'julio@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({
    description: 'Status do pedido',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @ApiProperty({
    description: 'Data de criação do pedido',
    example: '2025-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: 'Data de processamento do pedido',
    example: '2025-01-02T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  processedAt?: Date;
}
