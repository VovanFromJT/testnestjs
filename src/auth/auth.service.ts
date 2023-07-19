import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.userService.findOne(name);
        console.log(user);
        if (user && (bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            console.log(result);
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async resetPassword(name: string, newPassword: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        return this.userService.updatePassword(name, hashedPassword);
    }
}
