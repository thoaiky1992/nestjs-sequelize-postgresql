"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const cookieParser = require("cookie-parser");
const socket_io_adapter_1 = require("./library/socket.io/socket.io.adapter");
const logger_1 = require("./library/logger/logger");
dotenv_1.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_1.NestLogger(),
    });
    app.useWebSocketAdapter(new socket_io_adapter_1.RedisIoAdapter(app));
    app.enableCors();
    app.use(cookieParser(process.env.MAIN_JWT_TOKEN || 'thoaiky1992'));
    app.setGlobalPrefix('api');
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('API Swagger')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('Nestjs-Sequelize-postgresql')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(process.env.MAIN_APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map