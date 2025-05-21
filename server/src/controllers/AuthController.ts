import { AuthService } from "@/services/AuthService";

export class AuthController {
    private authService = new AuthService();
    async login({ email, password }: { email: string; password: string }) {
        try {
            return await this.authService.login({ email, password });
        } catch (error) {
            throw error;
        }
    }
}
