import { CategoryService } from '../../src/services/CategoryService';
import { Category } from '../../src/entities/Category';
import {Repository} from "typeorm";

jest.mock('typeorm', () => {
  return {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    }),
    Category: () => null,
  };
});

describe('CategoryService', () => {
  //let service: CategoryService;
  let mockCategory: Category;
  let mockCategory2: Category;

  let categoryService: CategoryService;
  let categoryRepository: jest.Mocked<Repository<Category>>;

  beforeEach(() => {
    categoryService = new CategoryService();
    mockCategory = new Category();
    mockCategory.id = 1000;
    mockCategory.name = 'Test Category';
    mockCategory2 = new Category();
    mockCategory2.id = 1001;
    mockCategory2.name = 'Test Category2';
    mockCategory2.parentID=1000;
    categoryRepository = (jest.requireMock('typeorm').getRepository as jest.MockedFunction<
        typeof Repository
    >)(Category);
  // });
  //
  // beforeEach(() => {
  });

  it('should create a category', async () => {
    const result = await categoryService.addCategory(mockCategory.name);
    expect(result).toBeDefined();
    expect(result.name).toBe('Test Category');
  });

  it('should get a category by id', async () => {
    await categoryService.addCategory(mockCategory.name, mockCategory.id);
    const result = await categoryService.getCategoryById(1000);
    expect(result).toBeDefined();
    if (result instanceof Category) {
      expect(result.id).toBe(1000);
    }
  });

  it('should get a parentID id', async () => {
    await categoryService.addCategory(mockCategory.name, mockCategory.id);
    const result = await categoryService.getCategoryById(1000);
    expect(result).toBeDefined();
    if (result instanceof Category) {
      expect(result.parentID).toBe(1001);
    }
  });
// });
//
//
// describe('CategoryService', () => {


  it('should fetch all categories', async () => {
    const categories = [{ id: 1, name: 'Electronics' }];
    categoryRepository.find.mockResolvedValue(categories);

    const result = await categoryService.getAllCategories();

    expect(categoryRepository.find).toHaveBeenCalled();
    expect(result).toEqual(categories);
  });

  it('should fetch a category by id', async () => {
    const category = { id: 1, name: 'Electronics' };
    categoryRepository.findOne.mockResolvedValue(category);

    const result = await categoryService.getCategoryById(1);

    expect(categoryRepository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(category);
  });

  it('should create a category', async () => {
    const newCategory = { id: 1, name: 'Electronics' };
    categoryRepository.save.mockResolvedValue(newCategory);

    const result = await categoryService.createCategory(newCategory);

    expect(categoryRepository.save).toHaveBeenCalledWith(newCategory);
    expect(result).toEqual(newCategory);
  });

  it('should update a category', async () => {
    const updatedCategory = { id: 1, name: 'Gadgets' };
    categoryRepository.save.mockResolvedValue(updatedCategory);

    const result = await categoryService.updateCategory(1, updatedCategory);

    expect(categoryRepository.save).toHaveBeenCalledWith(updatedCategory);
    expect(result).toEqual(updatedCategory);
  });

  it('should delete a category', async () => {
    categoryRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await categoryService.deleteCategory(1);

    expect(categoryRepository.delete).toHaveBeenCalledWith(1);
    expect(result.affected).toBe(1);
  });
});

