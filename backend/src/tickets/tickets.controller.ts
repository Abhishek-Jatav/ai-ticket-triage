import { Controller, Post, Body, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('analyze')
  async analyze(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.analyzeAndSave(createTicketDto.message);
  }

  @Get()
  async getAll() {
    return this.ticketsService.findAll();
  }
}
