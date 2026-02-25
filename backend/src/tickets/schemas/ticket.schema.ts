import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: false })
export class Ticket {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ type: [String], required: true })
  keywords: string[];

  @Prop({ type: [String], required: true })
  urgencySignals: string[];

  @Prop({ required: true })
  confidence: number;

  @Prop({ required: true })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
