import env from 'env-var';

export const port = env.get('PORT').default(3000).asPortNumber();
export const serviceName = env.get('SERVICE_NAME').required().asString();
export const apiUrl = env.get('API_URL').required().asString();
export const serviceVersion = env.get('SERVICE_VERSION').required().asString();
