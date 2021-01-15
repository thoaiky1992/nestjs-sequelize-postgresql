import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(payload: authDto, req: Response): Promise<{
        token: string;
    }>;
    signUp(user: UserDto): Promise<{
        user: any;
        token: string;
    }>;
}
