import {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import ProductsApiAdapter from "../adapters/ProductsApiAdapter";

class ProductsRepository extends ProductsApiAdapter {
  constructor(container: FastifyInstance) {
    super(container);
  }
}

// Use Fastify as IoC container to inject dependencies
export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate('ToDoRepository', new ProductsRepository(fastify));
});

declare module 'fastify' {
  export interface FastifyInstance {
    ProductsRepository: ProductsRepository;
  }
}