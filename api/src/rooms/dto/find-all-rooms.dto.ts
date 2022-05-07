import { Prisma } from '.prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class FindAllRoomsDto extends PaginationQueryDto<Prisma.RoomOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'number' must be a string" })
  number?: string;
}
