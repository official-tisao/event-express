import { Repository, EntityManager } from "typeorm";
import { Category } from "../entities/Category";

/**
 * Repository for Category entity
 */
export class CategoryRepository {
  private repository: Repository<Category>;

  public constructor(repository: Repository<Category>) {
    this.repository = repository;
  }

  public async save(sample: Category): Promise<Category> {
    return this.repository.save(sample);
  }

  public async findById(id: number): Promise<Category | null> {
    return this.repository.createQueryBuilder("category")
      .where("category.id = :id", { id })
      .getOne();
  }

  public getManager(): EntityManager {
    return this.repository.manager;
  }

  public async findAll(): Promise<Category[]> {
    return this.repository.find();
  }
  // public async findById(id: number): Promise<Category | null> {
  //   return this.repository.findOne({ where: { id } });
  // }
}
