import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body) {
        const user = await this.authService.validateUser(body.name, body.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('protected')
    async protected() {
        return { message: 'Hello' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('reset')
    async reset(@Request() req, @Body() { newPassword }) {
        const updatedUser = await this.authService.resetPassword(
            req.user.name,
            newPassword,
        );
        return { message: 'Password updated successfully' };
    }
}
