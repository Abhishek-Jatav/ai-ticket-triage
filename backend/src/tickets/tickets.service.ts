import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { AnalyzerService } from './analyzer.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketModel: Model<TicketDocument>,
    private analyzerService: AnalyzerService,
  ) {}

  async analyzeAndSave(message: string) {
    const analysis = this.analyzerService.analyze(message);

    const createdTicket = new this.ticketModel({
      message,
      ...analysis,
      createdAt: new Date(),
    });

    await createdTicket.save();

    return analysis;
  }

  async findAll() {
    return this.ticketModel.find().sort({ createdAt: -1 }).exec();
  }
}
