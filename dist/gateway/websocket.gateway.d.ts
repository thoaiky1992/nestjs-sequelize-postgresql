import { OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/modules/users/user.model';
export declare class StaffGateway implements OnGatewayInit, OnGatewayConnection {
    private user;
    constructor(user: typeof User);
    afterInit(server: Server): any;
    handleConnection(client: Socket): Promise<boolean>;
}
