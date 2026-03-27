import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

function normalize(origin?: string) {
  return origin?.toLowerCase().replace(/\/$/, '');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ✅ Get and normalize allowed origins
  const rawOrigins = configService.get<string>('FRONTEND_URL') || '';

  const allowedOrigins = rawOrigins
    .split(',')
    .map((o) => normalize(o.trim()))
    .filter(Boolean);

  console.log('✅ Allowed Origins:', allowedOrigins);

  // ✅ FIXED CORS (important)
  app.enableCors({
    origin: (origin, callback) => {
      // allow Postman / server calls
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalize(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error('❌ Blocked by CORS:', origin);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  });

  // ✅ Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
