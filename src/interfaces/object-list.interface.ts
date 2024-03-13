import { IObject } from './object.interface';

export abstract class IObjectList {
    objects: Array<IObject>;
    meta: { hasNext: boolean; total: number };
}
