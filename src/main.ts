import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { HttpErrorFilter } from './exceptions/htttp-error-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3000);
  console.log('🚀 Server is running on http://localhost:3000');
}


bootstrap();
