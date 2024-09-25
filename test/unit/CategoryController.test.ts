import { TestHelper } from "../../src/mock.helper/DbInstanceHelper";
import { mockEntityManager } from "../../src/mock.helper/MockEntityManager";
import { CategoryRepository } from "../../src/mock.helper/CategoryRepository";
import { mockDeep } from "jest-mock-extended";
import httpMocks from "node-mocks-http";
import { EntityNotFoundError } from "typeorm";
import { Category } from "../../src/entities/Category";
import * as CategoryController from "../../src/controllers/CategoryController";

import {
    addCategory,
    removeCategory,
    getSubtree,
    moveSubtree,
    getDefaultAndHealthCheck,
    getAllCategories,
    getCategory,
    updateCategory
}  from "../../src/controllers/CategoryController";
import {CustomException} from "../../src/exceptions/CustomException";
import RejectedValue = jest.RejectedValue;

jest.mock("../../src/mock.helper/CategoryRepository");
/*
describe("CategoryController Test", () => {
    // Create a mock express request/response
    let mockRequest = httpMocks.createRequest();
    let mockResponse = httpMocks.createResponse();

    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();
    });

    afterAll(() => {
        TestHelper.instance.teardownTestDB();
    });

    beforeEach(() => {
        // Anything else we need to mock?
    });

    // Resetting our request and any mocks done
    // to the repository
    afterEach(() => {
        (CategoryRepository as jest.Mock).mockClear();

        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    describe("CategoryController.get",  () => {

        // describe("getAllCategories", () => {
        //     it("should return 200 with all categories", async () => {
        //         const mockCategories = [
        //             { id: "1", name: "Category 1", parentId: null, children: [] },
        //             { id: "2", name: "Category 2", parentId: null, children: [] }
        //         ];

        //         jest.spyOn(CategoryRepository.prototype, "findAll").mockResolvedValueOnce(mockCategories);

        //         await getAllCategories(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.findAll).toHaveBeenCalled();
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getJSONData()).toEqual(mockCategories);
        //     });

        //     it("should return 500 on unexpected error", async () => {
        //         jest.spyOn(CategoryRepository.prototype, "findAll").mockRejectedValueOnce(new Error("Unexpected error"));

        //         await getAllCategories(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(500);
        //         expect(mockResponse._getData()).toBe("An error occurred while fetching categories");
        //     });
        // });

        // describe("getCategory", () => {
        //     it("should return 200 with the Category object", async () => {
        //         mockRequest.params = {
        //             id: "1"
        //         };

        //         const mockCategory = {
        //             id: "1",
        //             name: "Test Category",
        //             parentId: null,
        //             children: []
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "findById").mockResolvedValueOnce(mockCategory);

        //         await getCategory(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.findById).toHaveBeenCalledWith("1");
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getJSONData()).toEqual(mockCategory);
        //     });

        //     it("should return 404 when category is not found", async () => {
        //         mockRequest.params = {
        //             id: "999"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "findById").mockResolvedValueOnce(null);

        //         await getCategory(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(404);
        //         expect(mockResponse._getData()).toBe("Category not found");
        //     });
        // });

        // describe("getSubtree", () => {
        //     it("should return 200 with the category subtree", async () => {
        //         mockRequest.params = {
        //             id: "1"
        //         };

        //         const mockSubtree = {
        //             id: "1",
        //             name: "Parent",
        //             children: [
        //                 { id: "2", name: "Child 1", children: [] },
        //                 { id: "3", name: "Child 2", children: [] }
        //             ]
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "getSubtree").mockResolvedValueOnce(mockSubtree);

        //         await getSubtree(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.getSubtree).toHaveBeenCalledWith("1");
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getJSONData()).toEqual(mockSubtree);
        //     });

        //     it("should return 404 when category is not found", async () => {
        //         mockRequest.params = {
        //             id: "999"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "getSubtree").mockResolvedValueOnce(null);

        //         await getSubtree(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(404);
        //         expect(mockResponse._getData()).toBe("Category not found");
        //     });
        // });

        // describe("addCategory", () => {
        //     it("should return 201 with the created category", async () => {
        //         mockRequest.body = {
        //             name: "New Category",
        //             parentId: "1"
        //         };

        //         const mockCreatedCategory = {
        //             id: "2",
        //             name: "New Category",
        //             parentId: "1",
        //             children: []
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "create").mockResolvedValueOnce(mockCreatedCategory);

        //         await addCategory(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.create).toHaveBeenCalledWith(mockRequest.body);
        //         expect(mockResponse.statusCode).toBe(201);
        //         expect(mockResponse._getJSONData()).toEqual(mockCreatedCategory);
        //     });

        //     it("should return 400 when name is missing", async () => {
        //         mockRequest.body = {
        //             parentId: "1"
        //         };

        //         await addCategory(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(400);
        //         expect(mockResponse._getData()).toBe("Name is required");
        //     });
        // });

        // describe("updateCategory", () => {
        //     it("should return 200 with the updated category", async () => {
        //         mockRequest.params = {
        //             id: "1"
        //         };
        //         mockRequest.body = {
        //             name: "Updated Category"
        //         };

        //         const mockUpdatedCategory = {
        //             id: "1",
        //             name: "Updated Category",
        //             parentId: null,
        //             children: []
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "update").mockResolvedValueOnce(mockUpdatedCategory);

        //         await updateCategory(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.update).toHaveBeenCalledWith("1", mockRequest.body);
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getJSONData()).toEqual(mockUpdatedCategory);
        //     });

        //     it("should return 404 when category is not found", async () => {
        //         mockRequest.params = {
        //             id: "999"
        //         };
        //         mockRequest.body = {
        //             name: "Updated Category"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "update").mockResolvedValueOnce(null);

        //         await updateCategory(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(404);
        //         expect(mockResponse._getData()).toBe("Category not found");
        //     });
        // });

        // describe("moveSubtree", () => {
        //     it("should return 200 with success message", async () => {
        //         mockRequest.params = {
        //             id: "1"
        //         };
        //         mockRequest.body = {
        //             newParentId: "2"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "moveSubtree").mockResolvedValueOnce(true);

        //         await moveSubtree(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.moveSubtree).toHaveBeenCalledWith("1", "2");
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getData()).toBe("Subtree moved successfully");
        //     });

        //     it("should return 404 when category is not found", async () => {
        //         mockRequest.params = {
        //             id: "999"
        //         };
        //         mockRequest.body = {
        //             newParentId: "2"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "moveSubtree").mockResolvedValueOnce(false);

        //         await moveSubtree(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(404);
        //         expect(mockResponse._getData()).toBe("Category not found");
        //     });
        // });

        // describe("removeCategory", () => {
        //     it("should return 200 with success message", async () => {
        //         mockRequest.params = {
        //             id: "1"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "remove").mockResolvedValueOnce(true);

        //         await removeCategory(mockRequest, mockResponse);

        //         expect(CategoryRepository.prototype.remove).toHaveBeenCalledWith("1");
        //         expect(mockResponse.statusCode).toBe(200);
        //         expect(mockResponse._getData()).toBe("Category deleted successfully");
        //     });

        //     it("should return 404 when category is not found", async () => {
        //         mockRequest.params = {
        //             id: "999"
        //         };

        //         jest.spyOn(CategoryRepository.prototype, "remove").mockResolvedValueOnce(false);

        //         await removeCategory(mockRequest, mockResponse);

        //         expect(mockResponse.statusCode).toBe(404);
        //         expect(mockResponse._getData()).toBe("Category not found");
        //     });
        // });
        it("should return 404 due to entity not found", async () => {
            mockRequest.params = {
                id: "1"
            };

            // Here we force the repository to fail due to a not found error by TypeOrm
            // The error type can be adjusted based on how your repository function behave
            jest.spyOn(
                CategoryRepository.prototype,
                "findById"
            ).mockRejectedValueOnce(true);

            // Here we trigger the function
            await removeCategory(mockRequest, mockResponse);

            // And testing our expected result
            expect(mockResponse.statusCode).toEqual(404);
        });

        it("should return 200 with the Category object", async () => {
            mockRequest.params = {
                id: "1"
            };

            const mockCategory = {
                id: "1",
                name: "First Category",
                parent: null,
                children:[]
            } as unknown as Category

            jest.spyOn(
                CategoryRepository.prototype,
                "save"
            ).mockResolvedValue(mockCategory)
                //.mockResolvedValueOnce(mockCategory);
            mockResponse.json({
                id: "1",
                name: "First Category",
                parent: null,
                children:[]
            })
            // Here we trigger the function
            await getCategory(mockRequest, mockResponse);

            // And testing our expected result
            // we can see if the repository is called with the right parameters
            // expect((CategoryRepository as jest.Mock).mock.instances[0].findById)
            //     .toHaveBeenCalledWith(1);
            expect(mockResponse.statusCode).toEqual(200);
            // expect(mockResponse._getData()).toEqual(mockCategory);
        })
    })

    // describe("CategoryController.create", async () =>  {
    //     it("should return 200 and update Tier object", async () => {
    //         const testInput: Category = {
    //             name: "Test Category",
    //         };
    //         const mockDBOutput = mockDeep<Category>(testInput)

    //         mockRequest.body = testInput;

    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         jest.spyOn(CategoryRepository.prototype, "getManager").mockReturnValue({
    //             transaction: jest.fn().mockImplementation(mockEntityManager),
    //         })

    //         expect((CategoryRepository as jest.Mock).mock.instances[0].getManager)
    //             .toHaveBeenCalledTimes(1)
    //         expect(mockResponse.statusCode).toEqual(200);
    //         expect(mockResponse._isEndCalled()).toBeTruthy();
    //     });
    // })
});
//*/