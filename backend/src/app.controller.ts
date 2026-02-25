import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'AI Ticket Triage API is running 🚀';
  }

  @Get('ping')
  getHealth(): object {
    return {
      status: 'ok',
      message: 'Server is healthy',
      timestamp: new Date(),
    };
  }
}
