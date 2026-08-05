import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuotesService {
  private readonly logger = new Logger(QuotesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createQuote(dto: CreateQuoteDto) {
    console.log('=== [BACKEND POST /api/quotes RECEIVED] ===');
    console.log('Incoming Quote Payload:', JSON.stringify(dto, null, 2));

    const name = dto.name || 'Valued Customer';
    const phone = dto.phone || '0000000000';
    const movingFrom = dto.movingFrom || 'Navi Mumbai';
    const movingTo = dto.movingTo || dto.toCity || 'Local Shifting';
    const moveSize = dto.moveSize || dto.propertySize || dto.serviceType || '2 BHK Apartment';
    const dateParsed = dto.moveDate ? new Date(dto.moveDate) : null;
    const moveDate = dateParsed && !isNaN(dateParsed.getTime()) ? dateParsed : null;
    const items = dto.items || null;
    const notes = dto.notes || null;
    const email = dto.email || null;

    try {
      const lead = await this.prisma.lead.create({
        data: {
          name,
          phone,
          email,
          movingFrom,
          movingTo,
          moveDate,
          serviceType: moveSize,
          items,
          status: 'LEAD_CAPTURED',
          notes,
        },
      });

      console.log('=== [SUPABASE PERSISTENCE SUCCESS] ===');
      console.log('Persisted Lead ID:', lead.id);
      console.log('Persisted Record:', JSON.stringify(lead, null, 2));

      return {
        success: true,
        message: 'Lead captured and saved to Supabase successfully',
        leadId: lead.id,
        data: lead,
      };
    } catch (error) {
      console.error('=== [PRISMA DATABASE ERROR] ===');
      console.error('Failed to create lead record in Supabase:', error);
      throw error;
    }
  }

  async getAllQuotes() {
    return await this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
