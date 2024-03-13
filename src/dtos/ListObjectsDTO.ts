import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { OBJECT_PAGINATION_FILTERS } from '../constants';

export class ListObjectsDTO {
    @IsNumberString()
    @ApiProperty(OBJECT_PAGINATION_FILTERS.LIMIT)
    limit: 'string';

    @IsNumberString()
    @ApiProperty(OBJECT_PAGINATION_FILTERS.OFFSET)
    offset: 'string';
}
