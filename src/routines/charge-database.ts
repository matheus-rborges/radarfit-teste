import * as objects from '../../objects.json';
import { ObjectsRepository } from '../providers/repositories';
import { PrismaService } from '../providers/services/prisma.service';
import { IObject } from '../interfaces';

export const chargeDatabase = async () => {
    const { objects: objects_ } = objects as { objects: Array<IObject> };
    const objectsRepository = new ObjectsRepository(new PrismaService());

    for (const object of objects_) {
        await objectsRepository.create(object);
    }
};

chargeDatabase();
