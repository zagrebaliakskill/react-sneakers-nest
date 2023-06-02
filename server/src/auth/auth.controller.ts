import {
    Body,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
    Response
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guards';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto, @Response({ passthrough: true }) res) {
      const data = await this.authService.login(dto);
      const { refreshToken, ...updatedData } = data
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      console.log(res)
      return updatedData
    }

    @Post('refresh')
    @UseGuards(RefreshJwtGuard)
    async refresh(@Request() req) {
        return this.authService.refresh(req)
    }

    @UseGuards(JwtGuard)
    @Post('test')
    async test() {
        return '123';
    }
}
