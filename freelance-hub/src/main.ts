import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(

    new ValidationPipe({
    
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    
    }),
  
  );

  const swaggerConfig = new DocumentBuilder()
  
    .setTitle ('FreelanceHub API')
    .setDescription ('API para publicar y explorar servicios freelance.')
    .setVersion ('1.0')
    .addBearerAuth (
      
      {
      
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT obtenido en /auth/login',
      
      },
      'jwt',
    
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();