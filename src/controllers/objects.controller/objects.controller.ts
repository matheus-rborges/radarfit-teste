import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectsService } from '../../providers/services';
import { CreateObjectDTO, ListObjectsDTO, UpdateObjectDTO } from '../../dtos';

@Controller('objects')
@ApiTags('objects')
export class ObjectsController {
    constructor(private readonly objectsService: ObjectsService) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async list(@Query() query: ListObjectsDTO) {
        return this.objectsService.list(+query.limit, +query.offset);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id') id: number) {
        return this.objectsService.get(id);
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateObjectDTO) {
        return this.objectsService.create(data);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number) {
        return this.objectsService.delete(id);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: number, @Body() data: UpdateObjectDTO) {
        return this.objectsService.update(id, data);
    }
}
