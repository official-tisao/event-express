import { addCategory, removeCategory, getSubtree, moveSubtree, getDefaultAndHealthCheck, getAllCategories, getCategory }  from '../../src/controllers/CategoryController';
import { CategoryService } from '../../src/services/CategoryService';

let categoryService: CategoryService;

describe('addCategory', () => {

  // Successfully adds a new category with valid name and parentID
  it('should add a new category when valid name and parentID are provided', async () => {
    const req = {
      body: {
        name: 'New Category',
        parentID: 1
      }
    } as unknown as Request;
    const res = {
      json: jest.fn()
    } as unknown as Response;
    const addCategoryMock = jest.spyOn(categoryService, 'addCategory').mockResolvedValue({ id: 1, name: 'New Category', parentID: 1 });

    await addCategory(req as Request, res);

    expect(addCategoryMock).toHaveBeenCalledWith('New Category', 1);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'New Category', parentID: 1 });
  });

  // Handles missing name or parentID in the request body
  it('should return 500 error when name or parentID is missing', async () => {
    const req = {
      body: {
        name: ''
      }
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await addCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });
});

describe('CategoryController', () => {

  beforeEach(() => {
    categoryService = new CategoryService();
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
