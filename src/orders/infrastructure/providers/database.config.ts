import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from 'src/orders/domain/entities/order.entity';
import { config } from 'dotenv';

config();
export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [Order], 
  synchronize: process.env.NODE_ENV !== 'production', 
  logging: true,
};
