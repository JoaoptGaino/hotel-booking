import { Prisma } from '.prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class FindAllPeopleDto extends PaginationQueryDto<Prisma.PersonOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "'identification' must be a string" })
  identification?: string;

  @IsOptional()
  @IsString({ message: "'phoneNumber' must be a string" })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: "'roomId' must be a string" })
  roomId?: string;
}
