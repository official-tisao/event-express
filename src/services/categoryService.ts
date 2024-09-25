import { Category } from '../entities/Category';
import { AppDataSource } from '../configs/AppDataSource';
import { CategoryDTO } from '../dto/CategoryDTO';
import {CustomException} from "../exceptions/CustomException";
import {EntityNotFoundError} from "typeorm";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async addCategory(name: string, parentID?: number) {
        const category = new Category();
        category.name = name;
        const exist = await this.categoryRepository.findOne({ where: { name: name } });

        if (exist) throw new CustomException('Category already exists', 400);

        if (parentID) {
            const parentIDCategory = await this.categoryRepository.findOne({where: {id: parentID}});
            if (parentIDCategory) {
                category.parentID = parentIDCategory.id;
            }else{
                throw new CustomException('Parent Category not found', 400);
            }
        }

        return this.categoryRepository.save(category);
    }

    async removeCategory(id: number) {
        let category = await this.categoryRepository.findOne({where: {id: id}});
        if (category) {
            return this.categoryRepository.remove(category);
        }
        //throw new EntityNotFoundError("Category not found", {"id": id});
        throw new CustomException('Category not found', 404);
    }

    async getSubtree(id: number): Promise<CategoryDTO> {
        let category = await this.categoryRepository.findOne({where: {id: id}});
        if (!category) {
            throw new CustomException('Parent Category not found', 404);
        }

        const dto = new CategoryDTO();
        dto.id = category.id;
        dto.name = category.name;
        dto.parentID = category.parentID;

        dto.children = await this.getChildrenSubtrees(id) as unknown as CategoryDTO[];

        return dto;
    }

    private async getChildrenSubtrees(parentID: number): Promise<CategoryDTO[]> {
        const children = await this.categoryRepository.find({where: {parentID: parentID}});
        const childrenDTOs: CategoryDTO[] = [];

        for (const child of children) {
            const childDTO = await this.getSubtree(child.id);
            childrenDTOs.push(childDTO);
        }

        return childrenDTOs;
    }

    async moveSubtree(id: number, newParentId: number) {
        const category = await this.categoryRepository.findOne({where: {id: id}});
        const newParent = await this.categoryRepository.findOne({where: {id: newParentId}});
        if (category && newParent) {
            category.parentID = newParent.id;
            return this.categoryRepository.save(category);
        }
        throw new Error('Category or new parentID not found');
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

    async getCategoryByParentId(parentID: number) {
        return this.categoryRepository.find({where: {parentID: parentID}});
    }

    async getCategoryByParentName(parentIDName: string) {
        const parentID = await this.categoryRepository.findOne({ where: { name: parentIDName } });
        if (!parentID) throw new Error('Parent category not found');
            return this.categoryRepository.find({ where: { parentID: parentID.id } });
        }

    async getCategoryByChildName(childName: string) {
        return this.categoryRepository.findOne({ where: { name: childName } });
    }

    async updateCategoryById(id: number, name: any, newParentID: number=-1) {
        const category = await this.categoryRepository.findOne({where: {id: id}});
        if (category){
            category.name = name;
        }else{
            throw new CustomException('Category or new parentID not found', 400);
        }
        if (newParentID > 0){
            const newParent = await this.categoryRepository.findOne({where: {id: newParentID}});
            if (category && newParent) {
                category.parentID = newParent.id;
                return this.categoryRepository.save(category);
            }
        }else{
            return this.categoryRepository.save(category);
        }
        throw new CustomException('Category or new parentID not found', 400);
    }
}
