import { Inject, Injectable } from '@nestjs/common';
import { ObjectsRepository } from '../repositories';
import { IObject } from '../../interfaces';
import { ObjectNotFoundException } from '../../errors';

@Injectable()
export class ObjectsService {
    constructor(
        @Inject(ObjectsRepository)
        private readonly objectsRepository: ObjectsRepository
    ) {}

    async create(data: IObject) {
        return await this.objectsRepository.create(data);
    }

    async get(id: number) {
        if (!+id) throw new ObjectNotFoundException({ id });

        const response = await this.objectsRepository.get(id);

        if (!response) throw new ObjectNotFoundException({ id });

        return response;
    }

    async list(limit: number, offset: number) {
        return await this.objectsRepository.list(limit, offset);
    }

    async delete(id: number) {
        if (!+id) throw new ObjectNotFoundException({ id });

        try {
            return await this.objectsRepository.delete(id);
        } catch (error) {
            throw new ObjectNotFoundException({ id });
        }
    }

    async update(id: number, data: IObject) {
        if (!+id) throw new ObjectNotFoundException({ id });

        try {
            return await this.objectsRepository.update({ id, ...data });
        } catch (error) {
            throw new ObjectNotFoundException({ id });
        }
    }
}
