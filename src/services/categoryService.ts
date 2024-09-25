import { Category } from '../entities/Category';
import { AppDataSource } from '../configs/AppDataSource';

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async addCategory(name: string, parentId?: number) {
        const category = new Category();
        category.name = name;
        const exist = await this.categoryRepository.findOne({ where: { name: name } });
        
        if (exist) throw new Error('Category already exists');
        
        if (parentId) {
            const parentCategory = await this.categoryRepository.findOne({where: {id: parentId}});
            if (parentCategory) {
                category.parentId = parentCategory.id;
            }
        }

        return this.categoryRepository.save(category);
    }

    async removeCategory(id: number) {
        const category = await this.categoryRepository.findOne({where: {id: id}});
        if (category) {
            return this.categoryRepository.remove(category);
        }
        throw new Error('Category not found');
    }

    async getSubtree(id: number) {
        return this.categoryRepository.findBy({parentId: id});
    }

    async moveSubtree(id: number, newParentId: number) {
        const category = await this.categoryRepository.findOne({where: {id: id}});
        const newParent = await this.categoryRepository.findOne({where: {id: newParentId}});
        if (category && newParent) {
            category.parentId = newParent.id;
            return this.categoryRepository.save(category);
        }
        throw new Error('Category or new parent not found');
    }

    async getAllCategories() {
        return this.categoryRepository.find();
    }

    async getCategoryById(id: number) {
        return this.categoryRepository.findOne({where: {id: id}});
    }

    async getCategoryByName(name: string) {
        return this.categoryRepository.findOne({where: {name: name}});
    }

    async getCategoryByParentId(parentId: number) {
        return this.categoryRepository.find({where: {parentId: parentId}});
    }

    async getCategoryByParentName(parentName: string) {
        const parent = await this.categoryRepository.findOne({ where: { name: parentName } });
        if (!parent) throw new Error('Parent category not found');
            return this.categoryRepository.find({ where: { parentId: parent.id } });
        }

    async getCategoryByChildName(childName: string) {
        return this.categoryRepository.findOne({ where: { name: childName } });
    }
}