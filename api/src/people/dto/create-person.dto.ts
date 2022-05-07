import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: "'name' must be a string" })
  name: string;

  @IsNotEmpty({ message: 'Identification is required' })
  @IsString({ message: "'identification' must be a string" })
  identification: string;

  @IsNotEmpty({ message: 'Phone Number is required' })
  @IsString({ message: "'phoneNumber' must be a string" })
  phoneNumber: string;
}
