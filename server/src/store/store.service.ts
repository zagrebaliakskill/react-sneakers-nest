import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BuyDto } from './dto/buy.dto';

@Injectable()
export class StoreService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async load() {
        return await this.prismaService.storeItem.findMany()
    }

    async buy(id: number, dto: BuyDto) {

    }
}
