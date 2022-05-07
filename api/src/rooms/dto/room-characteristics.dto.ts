import { IsNotEmpty, IsString } from 'class-validator';

export class RoomCharacteristicDto {
  @IsNotEmpty({ message: 'Room characteristic name is required' })
  @IsString({ message: 'Room characteristic name must be a string' })
  name: string;
}
