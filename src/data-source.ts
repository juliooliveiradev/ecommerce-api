import { DataSource } from 'typeorm';
import { Order } from './orders/domain/entities/order.entity';
import { config } from 'dotenv';


config(); 
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [Order], 
  synchronize: false,
  migrations: ['./src/migrations/*.ts'],
  logging: true,
});
