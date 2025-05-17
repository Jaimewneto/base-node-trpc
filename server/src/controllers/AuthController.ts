import { AuthService } from "../services/AuthService";

const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        return await AuthService.login({ email, password });
    } catch (error) {
        throw error;
    }
}

export const AuthController = {
    login,
};
