import fp from 'fastify-plugin'
import { SensibleOptions } from '@fastify/sensible'
import axios, {AxiosInstance} from "axios";

export default fp<SensibleOptions>(async (fastify) => {
    const httpClient = {
        products: axios.create({
            baseURL: process.env.PRODUCTS_SERVICE_BASE_URL
        })
    }
    fastify.decorate('httpClient', httpClient)
})

declare module 'fastify' {
    interface FastifyInstance {
        httpClient: {products: AxiosInstance}
    }
}