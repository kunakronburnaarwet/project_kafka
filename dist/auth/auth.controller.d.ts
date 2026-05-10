import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        password: string;
    }): Promise<import("./user.schema").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
