import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { IObject, IObjectList } from '../../interfaces';

@Injectable()
export class ObjectsRepository {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

    async create(data: IObject): Promise<IObject> {
        return await this.prismaService.object.create({ data });
    }

    async get(id: number): Promise<IObject> {
        return await this.prismaService.object.findUnique({ where: { id } });
    }

    async list(limit = 10, offset = 0): Promise<IObjectList> {
        const promises = [
            this.prismaService.object.findMany({
                skip: offset,
                take: limit,
            }),
            this.prismaService.object.count(),
        ];

        const [objects, total] = await Promise.all(promises);

        const meta = {
            hasNext: limit + offset < (total as number),
            total: total as number,
        };
        return { objects: objects as Array<IObject>, meta };
    }

    async update({ id, ...data }: IObject): Promise<IObject> {
        return await this.prismaService.object.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<IObject> {
        return await this.prismaService.object.delete({ where: { id } });
    }
}
