import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login({email, password}: LoginDto) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email/password')
        }

        const passMatch = await compare(password, user.password);

        if (!passMatch) {
            throw new UnauthorizedException('Invalid email/password')
        }

        return {
            token: this.jwtService.sign({name: user.name, profile_img: user.profile_img}, {subject: user.id})
        }
    }
}

