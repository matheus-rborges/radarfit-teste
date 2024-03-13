import { PrismaService, ObjectsService } from '../../providers';
import { ObjectsController } from './objects.controller';
import { ObjectsRepository } from '../../providers/repositories';
import { CreateObjectDTO, ListObjectsDTO, UpdateObjectDTO } from '../../dtos';
import * as objectsMock from '../../../objects.json';
import { IObject, IObjectList } from '../../interfaces';
import { ObjectNotFoundException } from '../../errors';

describe('ObjectsController', () => {
    let objectsController: ObjectsController;
    let objectsService: ObjectsService;
    let prismaService: PrismaService;
    let objectRepository: ObjectsRepository;

    beforeEach(() => {
        prismaService = new PrismaService();
        objectRepository = new ObjectsRepository(prismaService);
        objectsService = new ObjectsService(objectRepository);
        objectsController = new ObjectsController(objectsService);
    });

    describe('get', () => {
        it('should return success when a valid id is passed', async () => {
            const [result] = objectsMock.objects;

            jest.spyOn(objectRepository, 'get').mockImplementation(
                async () => result as IObject
            );

            expect(await objectsController.get(result.id)).toBe(result);
        });

        it('should return error when an invalid id is passed', async () => {
            const result = null;

            jest.spyOn(objectRepository, 'get').mockImplementation(
                async () => result as IObject
            );
            try {
                await objectsController.get(-1);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ObjectNotFoundException);
            }
        });
    });

    describe('list', () => {
        it('should return the first 3 objects when limit 3 and offset 0 is passed', async () => {
            const all = objectsMock.objects;
            const total = objectsMock.objects.length;
            const limit = '3';
            const offset = '0';
            const expected = {
                objects: all.slice(+offset, +offset + +limit),
                meta: {
                    hasNext: true,
                    total: all.length,
                },
            };

            jest.spyOn(objectRepository, 'list').mockImplementation(
                async (limit, offset) =>
                    ({
                        objects: all.slice(offset, offset + limit),
                        meta: { total, hasNext: offset + limit < total },
                    } as IObjectList)
            );

            expect(
                await objectsController.list({
                    limit,
                    offset,
                } as unknown as ListObjectsDTO)
            ).toEqual(expected);
        });

        it('should return the final 2 objects when limit 3 and offset 3 is passed', async () => {
            const all = objectsMock.objects;
            const total = objectsMock.objects.length;
            const limit = '3';
            const offset = '3';
            const expected = {
                objects: all.slice(+offset, +offset + +limit),
                meta: {
                    hasNext: false,
                    total: all.length,
                },
            };

            jest.spyOn(objectRepository, 'list').mockImplementation(
                async (limit, offset) =>
                    ({
                        objects: all.slice(offset, offset + limit),
                        meta: { total, hasNext: offset + limit < total },
                    } as IObjectList)
            );

            expect(
                await objectsController.list({
                    limit,
                    offset,
                } as unknown as ListObjectsDTO)
            ).toEqual(expected);
        });

        it('should return error when an invalid offset is passed', async () => {
            const all = objectsMock.objects;
            const total = objectsMock.objects.length;
            const limit = '3';
            const offset = '3asdf';

            jest.spyOn(objectRepository, 'list').mockImplementation(
                async (limit, offset) =>
                    ({
                        objects: all.slice(offset, offset + limit),
                        meta: { total, hasNext: offset + limit < total },
                    } as IObjectList)
            );
            try {
                await objectsController.list({
                    limit,
                    offset,
                } as any);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
            }
        });

        it('should return error when an invalid limit is passed', async () => {
            const all = objectsMock.objects;
            const total = objectsMock.objects.length;
            const limit = '3asdfasd';
            const offset = '3';

            jest.spyOn(objectRepository, 'list').mockImplementation(
                async (limit, offset) =>
                    ({
                        objects: all.slice(offset, offset + limit),
                        meta: { total, hasNext: offset + limit < total },
                    } as IObjectList)
            );
            try {
                await objectsController.list({
                    limit,
                    offset,
                } as any);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
            }
        });
    });

    describe('put', () => {
        it('should return success (the updated object) when a valid id and body are passed', async () => {
            const [original] = objectsMock.objects;
            const payload = { name: 'new name' } as unknown as UpdateObjectDTO;
            const expectedResult = { ...original, ...payload };

            jest.spyOn(objectRepository, 'update').mockImplementation(
                async (result) => ({ ...original, ...result } as IObject)
            );

            expect(
                await objectsController.update(original.id, payload)
            ).toEqual(expectedResult);
        });

        it('should return error when an invalid id is passed', async () => {
            const payload = { name: 'new name' } as unknown as UpdateObjectDTO;

            jest.spyOn(objectRepository, 'update').mockImplementation(
                async () => {
                    throw new Error();
                }
            );

            try {
                await objectsController.update(-1, payload);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ObjectNotFoundException);
            }
        });

        it('should return error when an payload is passed', async () => {
            const [original] = objectsMock.objects;
            const payload = {
                name: 'new name',
                invalid: 'invalid property',
            } as unknown as UpdateObjectDTO;

            jest.spyOn(objectRepository, 'update').mockImplementation(
                async (result) => ({ ...original, ...result } as IObject)
            );

            try {
                await objectsController.update(original.id, payload as any);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
            }
        });
    });

    describe('post', () => {
        it('should return success (the created object) when a valid body is passed', async () => {
            const result = {
                name: 'new name',
                description: 'new description',
            } as unknown as CreateObjectDTO;

            const id =
                objectsMock.objects[objectsMock.objects.length - 1].id + 1;

            jest.spyOn(objectRepository, 'create').mockImplementation(
                async (result) => ({
                    id,
                    ...result,
                })
            );

            expect(await objectsController.create(result)).toEqual({
                id,
                ...result,
            });
        });

        it('should return error when an invalid property is passed', async () => {
            const payload = {
                name: 'new name',
                description: 1,
            } as unknown as CreateObjectDTO;

            jest.spyOn(objectRepository, 'create').mockImplementation(
                async (result) => ({
                    id:
                        objectsMock.objects[objectsMock.objects.length - 1].id +
                        1,
                    ...result,
                })
            );

            try {
                await objectsController.create(payload);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
            }
        });

        it('should return error when a non defined property is passed', async () => {
            const payload = {
                name: 'new name',
                description: 'new description',
                invalid: 'invalid test',
            } as unknown as CreateObjectDTO;

            jest.spyOn(objectRepository, 'create').mockImplementation(
                async (result) => ({
                    id:
                        objectsMock.objects[objectsMock.objects.length - 1].id +
                        1,
                    ...result,
                })
            );

            try {
                await objectsController.create(payload);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ReferenceError);
            }
        });
    });

    describe('delete', () => {
        it('should return success when a valid id is passed', async () => {
            const [result] = objectsMock.objects;

            jest.spyOn(objectRepository, 'delete').mockImplementation(
                async () => result as IObject
            );

            expect(await objectsController.delete(result.id)).toBe(result);
        });

        it('should return error when an invalid id is passed', async () => {
            const result = null;

            jest.spyOn(objectRepository, 'delete').mockImplementation(
                async () => result as IObject
            );
            try {
                await objectsController.delete(null);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ObjectNotFoundException);
            }
        });

        it('should return error when an valid id is passed but it does not correspond with any stored data', async () => {
            jest.spyOn(objectRepository, 'delete').mockImplementation(
                async () => {
                    throw new Error();
                }
            );
            try {
                await objectsController.delete(10000);
                fail('Object not validated');
            } catch (error) {
                expect(error).toBeInstanceOf(ObjectNotFoundException);
            }
        });
    });
});
