import {Product, ProductToCreate, ProductToUpdate, QueryParamsDTO} from "@pitia/types";

export default interface IProductsRepository {
  create(toDo: ProductToCreate): Promise<string>;
  update(id: string, fieldsToUpdate: ProductToUpdate): Promise<Product>;
  delete(id: string): Promise<boolean>;
  read(id: string): Promise<Product>;
  readAll(query: QueryParamsDTO): Promise<Product[]>;
}