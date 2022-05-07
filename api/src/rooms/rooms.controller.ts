import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomsService } from './services/rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindAllRoomsDto } from './dto/find-all-rooms.dto';
import { BookRoomService } from './services/book-room.service';
import { BookRoomDto } from './dto/book-room.dto';

@Controller('rooms')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly bookRoomService: BookRoomService,
  ) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll(@Query() query: FindAllRoomsDto) {
    return this.roomsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }

  @Post('/:id/room-person-booking')
  bookRoom(@Param('id') id: string, @Body() bookRoomDto: BookRoomDto) {
    return this.bookRoomService.run(id, bookRoomDto);
  }
}
