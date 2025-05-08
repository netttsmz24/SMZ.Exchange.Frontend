export interface PasswordResetOTPVerify {
    email: string;
    mobileNo: string;
    token: string;
    newPassword: string;
}