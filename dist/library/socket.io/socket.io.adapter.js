"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cookieParser = require("socket.io-cookie-parser");
const redisIoAdapter = require("socket.io-redis");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });
        server.adapter(redisAdapter);
        server.use(cookieParser(process.env.MAIN_JWT_TOKEN || 'thoaiky1992'));
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=socket.io.adapter.js.map