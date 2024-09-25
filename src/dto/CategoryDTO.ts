
import { Category } from '../entities/Category';
export class CategoryDTO {
    id: number=0;
    name: string="default";
    parent: Category;
    subtree: Category[];
}