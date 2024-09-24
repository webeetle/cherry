import {FastifyInstance} from "fastify";
import {Product, QueryParamsDTO} from "@pitia/types";

export default async function readProductsByPlatform(container: FastifyInstance, query: QueryParamsDTO): Promise<Product[]> {
    return await container.ProductsRepository.readAll(query)
}