import { Category } from '../../src/entities/Category';

describe('Category entity', () => {
  it('should create a Category instance', () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Test Category';
    expect(category).toBeDefined();
    expect(category.name).toBe('Test Category');
  });

  it('should throw an error when name is not provided', () => {
    const category = new Category();
    category.id = 1;
    expect(() => category.validate()).toThrow('Category name is required');
  });

  it('should allow creation with a valid parentID', () => {
    const parentIDCategory = new Category();
    parentIDCategory.id = 1;
    parentIDCategory.name = 'Parent Category';

    const childCategory = new Category();
    childCategory.id = 2;
    childCategory.name = 'Child Category';
    childCategory.parentID = parentIDCategory.id;

    expect(childCategory).toBeDefined();
    expect(childCategory.parentID).toBe(1);
  });

  it('should throw an error for non-existent parentID', async () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Test Category';
    category.parentID = 999; // Assuming 999 is a non-existent ID

    // Mock the findOne method to simulate a non-existent parentID
    jest.spyOn(Category, 'findOne').mockResolvedValue(null);

    await expect(category.validate()).rejects.toThrow('Parent category does not exist');
  });
});
