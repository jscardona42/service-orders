import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Service-Orders')
    .setDescription('The service-orders API description')
    .setVersion('1.0')
    .addBearerAuth({
      description: `[Por favor ingrese el token con el siguiente formato: Bearer < JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000 || process.env.PORT);
}
bootstrap();
