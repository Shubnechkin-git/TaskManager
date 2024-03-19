import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const fs = require('fs');
  const keyFile = fs.readFileSync(
    'D:\\VS Code Project\\TaskManager\\backend\\cert\\example.com+5-key.pem',
  );
  const certFile = fs.readFileSync(
    'D:\\VS Code Project\\TaskManager\\backend\\cert\\example.com+5.pem',
  );

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  // Разрешить запросы с определенных источников (origin)
  app.use(
    cors({
      origin: 'https://stage-app51699270-ef8a3ad48afb.pages.vk-apps.com',
      credentials: true, // если в запросе используются куки или заголовки аутентификации
    }),
  );

  console.log('https://localhost:3000/');

  await app.listen(3000);
}
bootstrap();
