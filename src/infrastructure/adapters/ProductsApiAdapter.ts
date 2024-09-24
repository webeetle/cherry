import {FastifyInstance} from "fastify";
import {AxiosInstance} from "axios";
import IProductsRepository from "../../core/interfaces/repositories/products/IProductsRepository";
import {Product, ProductToCreate, ProductToUpdate, QueryParamsDTO} from "@pitia/types";

export default class ProductsApiAdapter implements IProductsRepository {
    private httpClient: AxiosInstance;
    private readonly endpoint: string;

    protected constructor(container: FastifyInstance) {
        this.httpClient = container.httpClient.products
        this.endpoint = '/products'
    }

    async create(toDo: ProductToCreate): Promise<string> {
        const {data} = await this.httpClient.post(`${this.endpoint}`, toDo)
        return data
    }

    async update(id: string, fieldsToUpdate: ProductToUpdate): Promise<Product> {
        const {data} = await this.httpClient.patch(`${this.endpoint}/${id}`, fieldsToUpdate)
        return data
    }

    async delete(id: string): Promise<boolean> {
        await this.httpClient.delete(`${this.endpoint}/${id}`)
        return true
    }

    async read(id: string): Promise<Product> {
        const {data} = await this.httpClient.get(`${this.endpoint}/${id}`)
        return data
    }

    async readAll(query: QueryParamsDTO): Promise<Product[]> {
        const {data} = await this.httpClient.get(`${this.endpoint}${query.toString()}`)
        return data
    }
}