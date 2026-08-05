import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';

let cachedServer: Handler;

export async function bootstrapServerless(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    app.setGlobalPrefix('api');

    app.enableCors({ origin: '*' });

    await app.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrapServerless();
  return server(event, context, callback);
};

export default handler;

// Local development server runner
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ origin: '*' });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Backend running locally at http://localhost:${port}/api`);
  }

  if (require.main === module) {
    bootstrapLocal();
  }
}
