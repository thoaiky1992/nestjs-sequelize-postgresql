
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'socket.io-cookie-parser';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: any): any {
        const server = super.createIOServer(port, options);
        const redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });
        server.adapter(redisAdapter);
        server.use(cookieParser(process.env.MAIN_JWT_TOKEN || 'thoaiky1992'));
        return server;
    }
}