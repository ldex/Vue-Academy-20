import createRepository from '~/api/repository'

export default function (context, inject) {

    // Using the default axios instance
    const httpClientWithAxios = context.$axios;

    const repositoryWithHttpClient = createRepository(httpClientWithAxios)

    const repositories = {
      products: repositoryWithHttpClient('products'),
      customers: repositoryWithHttpClient('customers')
    }

    inject('repositories', repositories)
  }