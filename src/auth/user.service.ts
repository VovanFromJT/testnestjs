import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(name: string): Promise<User | undefined> {
        return this.userModel.findOne({ name });
    }

    async createUser(name: string, password: string): Promise<User> {
        const user = new this.userModel({ name, password });
        return user.save();
    }

    async updatePassword(name: string, newPassword: string): Promise<User> {
        const user = await this.userModel.findOne({ name });
        user.password = newPassword;
        return user.save();
    }
}
