import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { CreateOrderDto } from './orders/domain/dto/create-order-dto'; // Certifique-se de importar os DTOs

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('A API de Ecommerce para pedidos e produtos.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [CreateOrderDto], 
  });

  SwaggerModule.setup('api', app, document);
}
