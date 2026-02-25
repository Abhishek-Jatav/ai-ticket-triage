import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  message: string;
}
