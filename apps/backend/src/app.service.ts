import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Super South Packers & Movers API is running on Vercel Serverless!',
      timestamp: new Date().toISOString(),
    };
  }

  getHealth(): { status: string; uptime: number; environment: string } {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
