import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'Pendente',
  PROCESSED = 'Processado',
}

@Entity('orders')
export class Order {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do produto no pedido',
    example: 'Laptop',
  })
  @Column()
  product: string;

  @ApiProperty({
    description: 'Quantidade do produto no pedido',
    example: 2,
  })
  @Column()
  quantity: number;

  @ApiProperty({
    description: 'Preço do produto no pedido',
    example: 2000,
  })
  @Column()
  price: number;

  @ApiProperty({
    description: 'Nome do cliente que fez o pedido',
    example: 'Julio',
  })
  @Column()
  customerName: string;

  @ApiProperty({
    description: 'Email do cliente que fez o pedido',
    example: 'julio@email.com',
  })
  @Column()
  customerEmail: string;

  @ApiProperty({
    description: 'Status do pedido',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Data de criação do pedido',
    example: '2025-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do pedido',
    example: '2025-01-02T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de processamento do pedido',
    example: '2025-01-02T00:00:00.000Z',
    required: false,
  })
  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date | null;
}
