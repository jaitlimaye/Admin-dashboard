export type registerRequest = {
    email: string;
    password: string;
    confirmPassword?: string; // Optional for registration
}