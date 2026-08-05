import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QuotesModule } from './quotes/quotes.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [PrismaModule, QuotesModule, WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
