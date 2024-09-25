import { addCategory, removeCategory, getSubtree, moveSubtree, getDefaultAndHealthCheck, getAllCategories, getCategory }  from '../../src/controllers/CategoryController';
import { CategoryService } from '../../src/services/CategoryService';

describe('CategoryController', () => {
  //let controller: CategoryController;
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
    //controller = new CategoryController(service);
  });

  // it('should call service to create a category', () => {
  //   const createSpy = jest.spyOn(service, 'createCategory');
  //   controller.create({ name: 'Test Category' });
  //   expect(createSpy).toHaveBeenCalled();
  // });
  //
  // it('should get a category by id', () => {
  //   jest.spyOn(service, 'getCategoryById').mockReturnValue({ id: 1, name: 'Test Category' });
  //   const result = controller.get(1);
  //   expect(result).toBeDefined();
  //   expect(result.id).toBe(1);
  // });
});
