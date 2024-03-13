import { HttpException, HttpStatus } from '@nestjs/common';
import { GLOBAL_ERRORS } from '../../constants';

export class ObjectNotFoundException extends HttpException {
    constructor(context: unknown) {
        super(
            { ...GLOBAL_ERRORS.OBJECTS_ERRORS, query: context },
            HttpStatus.NOT_FOUND
        );
    }
}
