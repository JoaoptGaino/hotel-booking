import { RoomType } from '.prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoomCharacteristicDto } from './room-characteristics.dto';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Room number is required' })
  @IsString({ message: 'Room number must be a string' })
  number: string;

  @IsNotEmpty({ message: 'Room Type is required' })
  @IsEnum(RoomType, { message: 'Room Type must be a valid Room Type' })
  roomType: RoomType;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a string' })
  price: number;

  @IsNotEmpty({ message: 'Room characteristics are required' })
  @ValidateNested({ each: true })
  @Type(() => RoomCharacteristicDto)
  roomCharacteristics: RoomCharacteristicDto[];
}
