import { WebSocketGateway, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from "jsonwebtoken";
import { InjectModel } from "@nestjs/sequelize";
import { User } from 'src/modules/users/user.entity';
import { System } from './system.socket';

@WebSocketGateway()
export class StaffGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(
        @InjectModel(User)
        private user: typeof User,
    ) {
    }

    afterInit(server: Server): any {
        System.socket = server;
    }

    async handleConnection(client: Socket) {
        let token = client?.request?.signedCookies?.jwt;
        token = token || client.handshake.headers?.authorization?.split(' ')[1];
        if (token) {
            try {
                const payload = jwt.verify(
                    token,
                    process.env.COOKIE_SECRETE
                ) as any;
                const user = await this.user.findByPk(payload.id);

                if (!user) {
                    return false;
                }
                client.join(user.getRoom());
            } catch (ex) {
                console.log(ex);
                return false;
            }
        }
    }
}
