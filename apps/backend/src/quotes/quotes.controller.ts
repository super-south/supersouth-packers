import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuote(@Body() dto: CreateQuoteDto) {
    return await this.quotesService.createQuote(dto);
  }

  @Get()
  async getAllQuotes() {
    return await this.quotesService.getAllQuotes();
  }
}
