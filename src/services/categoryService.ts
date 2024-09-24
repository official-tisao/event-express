
import { getRepository } from 'typeorm';
import { Category } from '../entities/Category';

export class CategoryService {
    private categoryRepository = getRepository(Category);

    async addCategory(name: string, parentId?: number) {
        const category = new Category();
        category.name = name;

        if (parentId) {
            const parentCategory = await this.categoryRepository.findOne(parentId);
            if (parentCategory) {
                category.parent = parentCategory;
            }
        }

        return this.categoryRepository.save(category);
    }

    async removeCategory(id: number) {
        const category = await this.categoryRepository.findOne(id);
        if (category) {
            return this.categoryRepository.remove(category);
        }
        throw new Error('Category not found');
    }

    async getSubtree(id: number) {
        return this.categoryRepository.findDescendantsTree(await this.categoryRepository.findOne(id));
    }

    async moveSubtree(id: number, newParentId: number) {
        const category = await this.categoryRepository.findOne(id);
        const newParent = await this.categoryRepository.findOne(newParentId);
        if (category && newParent) {
            category.parent = newParent;
            return this.categoryRepository.save(category);
        }
        throw new Error('Category or new parent not found');
    }
}
