import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private readonly prisma: PrismaService) {}

  verifyWebhook(query: Record<string, string>) {
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    if (mode === 'subscribe' && token === (process.env.WHATSAPP_VERIFY_TOKEN || 'super_south_secret_token')) {
      return challenge;
    }
    return { status: 'verification_failed' };
  }

  async processWebhook(payload: any) {
    this.logger.log(`Received WhatsApp webhook event: ${JSON.stringify(payload)}`);

    const phone = payload?.phone || payload?.from || payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;
    const status = payload?.status || 'UPDATED_VIA_WHATSAPP';
    const messageText = payload?.message || payload?.text || payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
    const leadId = payload?.leadId;

    if (leadId) {
      try {
        const updated = await this.prisma.lead.update({
          where: { id: leadId },
          data: {
            status: status,
            notes: messageText ? `WhatsApp: ${messageText}` : undefined,
          },
        });
        return { success: true, message: 'Lead updated via leadId', lead: updated };
      } catch (err) {
        this.logger.warn(`Lead ID ${leadId} not found for WhatsApp update`);
      }
    }

    if (phone) {
      const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
      const existingLead = await this.prisma.lead.findFirst({
        where: { phone: { contains: cleanPhone } },
        orderBy: { createdAt: 'desc' },
      });

      if (existingLead) {
        const updated = await this.prisma.lead.update({
          where: { id: existingLead.id },
          data: {
            status: status,
            notes: messageText ? `WhatsApp: ${messageText}` : existingLead.notes,
          },
        });
        return { success: true, message: 'Lead updated via phone match', lead: updated };
      }
    }

    return {
      success: true,
      message: 'WhatsApp webhook processed successfully',
      payloadReceived: { phone, status, messageText, leadId },
    };
  }
}
