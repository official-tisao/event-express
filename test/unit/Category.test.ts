import { Category } from '../../src/entities/Category';
import {CustomException} from "../../src/exceptions/CustomException";

describe('Category entity', () => {
  it('should create a Category instance', () => {
    const category = new Category();
    category.id = 1;
    category.name = 'Test Category';
    expect(category).toBeDefined();
    expect(category.name).toBe('Test Category');
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

  // throws CustomException when name is null
  // it('should throw CustomException when name is null', () => {
  //   expect(() => {
  //     const category = new Category();
  //     category.name = '';
  //   }).toThrow(new CustomException('Name cannot be null/empty', 400));
  // });
});
