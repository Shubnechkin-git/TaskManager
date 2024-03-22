"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
const bodyParser = require("body-parser");
async function bootstrap() {
    const fs = require('fs');
    const keyFile = fs.readFileSync(__dirname + '\\..\\cert\\example.com+5-key.pem');
    const certFile = fs.readFileSync(__dirname + '\\..\\cert\\example.com+5.pem');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        },
    });
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors({
        origin: '*',
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    }));
    console.log('https://localhost:3000/');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map