import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { JwtGuard } from 'src/auth/guards/jwt.guards';
import { BuyDto } from './dto/buy.dto';
import { LoadDto } from './dto/load.dto';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @UseGuards(JwtGuard)
    @Post('buy')
    async buy(@Request() req, @Body() dto: BuyDto) {
        return this.storeService.buy(req.user.id, dto)
    }

    @Post("load")
    async load() {
        return this.storeService.load()
    }
}
