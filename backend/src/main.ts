import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const fs = require('fs');
  // const keyFile = fs.readFileSync(
  //   'D:\\VS Code Project\\TaskManager\\backend\\cert\\example.com+5-key.pem',
  // );
  // const certFile = fs.readFileSync(
  //   'D:\\VS Code Project\\TaskManager\\backend\\cert\\example.com+5.pem',
  // );

  const keyFile = fs.readFileSync(__dirname + '/../cert/example.com+5-key.pem');
  const certFile = fs.readFileSync(__dirname + '/../cert/example.com+5.pem');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Разрешить запросы с определенных источников (origin)
  app.use(
    cors({
      // origin: [
      //   'https://stage-app51699270-ef8a3ad48afb.pages.vk-apps.com',
      //   'https://localhost:10888/',
      //   'https://m.vk.com/app51699270?ref=catalog_recent',
      // ],
      origin: '*',
      credentials: true, // если в запросе используются куки или заголовки аутентификации,
      allowedHeaders: 'Content-Type,Authorization',
    }),
  );

  await app.listen(3000);
  const address = app.getHttpServer().address();
  const port = address.port;
  const hostname = address.address || 'localhost';

  console.log(`Server is running on http://${hostname}:${port}`);
}
bootstrap();
