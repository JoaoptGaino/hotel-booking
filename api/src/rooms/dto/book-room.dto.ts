import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class BookRoomDto {
  @IsNotEmpty({ message: 'Person is required' })
  @IsUUID('4', { message: 'Person must be a valid UUID' })
  personId: string;

  @IsNotEmpty({ message: 'Start Date is required' })
  @IsDate({ message: 'Start Date must be a date' })
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty({ message: 'End Date is required' })
  @IsDate({ message: 'End Date must be a date' })
  @Type(() => Date)
  endDate: Date;
}
