import { IsNotEmpty, IsUUID } from 'class-validator';

export class BookRoomDto {
  @IsNotEmpty({ message: 'Person is required' })
  @IsUUID('4', { message: 'Person must be a valid UUID' })
  personId: string;
}
