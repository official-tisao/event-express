
import { Category } from '../entities/Category';
export class CategoryDTO {
    id: number=0;
    name: string="default";
    parentID?: number;
    children?: CategoryDTO[];
}