import { CategoryService } from '../../src/services/CategoryService';
import { Category } from '../../src/entities/Category';

describe('CategoryService', () => {
  let service: CategoryService;
  let mockCategory: Category;
  let mockCategory2: Category;

  beforeEach(() => {
    service = new CategoryService();
    mockCategory = new Category();
    mockCategory.id = 1000;
    mockCategory.name = 'Test Category';
    mockCategory2 = new Category();
    mockCategory2.id = 1001;
    mockCategory2.name = 'Test Category2';
    mockCategory2.parentId=1000;
  });

  it('should create a category', async () => {
    const result = await service.addCategory(mockCategory.name);
    expect(result).toBeDefined();
    expect(result.name).toBe('Test Category');
  });

  it('should get a category by id', async () => {
    await service.addCategory(mockCategory.name, mockCategory.id);
    const result = await service.getCategoryById(1000);
    expect(result).toBeDefined();
    if (result instanceof Category) {
      expect(result.id).toBe(1000);
    }
  });

  it('should get a parent id', async () => {
    await service.addCategory(mockCategory.name, mockCategory.id);
    const result = await service.getCategoryById(1000);
    expect(result).toBeDefined();
    if (result instanceof Category) {
      expect(result.parentId).toBe(1001);
    }
  });
});
