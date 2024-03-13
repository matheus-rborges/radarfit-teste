import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { OBJECT_PROPERTIES } from '../constants';

export class UpdateObjectDTO {
    @IsString()
    @ApiProperty(OBJECT_PROPERTIES.DESCRIPTION)
    @IsOptional()
    description: 'string';

    @IsString()
    @ApiProperty(OBJECT_PROPERTIES.NAME)
    @IsOptional()
    name: 'string';
}
