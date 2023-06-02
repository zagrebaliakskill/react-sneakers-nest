import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async register(dto: RegisterDto) {
        let exsistUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (exsistUser) {
            throw new BadRequestException('User already exsist');
        }

        await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password)
            }
        });

        return 'User successfully registered !';
    }

    async login(dto: LoginDto) {
        let user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new BadRequestException('Wrong email or password');
        }

        if (!(await verify(user.password, dto.password))) {
            throw new BadRequestException('Wrong email or password');
        }

        let returnedUser = {
            id: user.id,
            email: user.email,
            login: user.login
        };

        return {
            user: returnedUser,
            ...(await this.createTokens(user.id, user.tokenVersion))
        };
    }

    async createTokens(userId: number, tokenVersion: number) {
        const data = { id: userId, tokenVersion };

        const accessToken = this.jwtService.sign(data, { expiresIn: '5m' });
        const refreshToken = this.jwtService.sign(data, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }

    async refresh(data) {

        let user = await this.prisma.user.findUnique({
            where: { id: data.user.id }
        });

        if (!user || data.user.tokenVersion !== user?.tokenVersion) {
            throw new BadRequestException();
        }

        let safeUserData = {
            email: user.email
        }

        return {
            user: safeUserData,
            accessToken: this.jwtService.sign(
                { id: user.id },
                { expiresIn: '5m' }
            )
        };
    }
}
