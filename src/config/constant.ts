import dotenv from 'dotenv';
dotenv.config();

export const PORT =  process.env.PORT;

export const FIREBASE = {
    STORAGE_BUCKET: process.env.FIREBASE_BUCKET
};

export const USER_DATA = {
    ID: process.env.USER_ID,
    NAME: process.env.USER_NAME,
    GROUP: process.env.USER_GROUP
};

export const TOKEN = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_TIME: process.env.EXPIRE_TIME
};

export const MESSAGES = {
    UNAUTHORIZED: 'Unauthorized',
    BAD_REQUEST: 'Bad Request',
    FORBIDDEN: 'Forbidden' , 
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_FOUND: 'Not Found',
    OK: 'Operation successful'
};

export const Routes = {
    ROOT : '/',
    API_SEARCH_PRODUCT: '/api/product-search',
    API_LOGIN: '/api/login',
    SWAGGER: '/api-docs'

};

export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};

export const Permissions: any = {
    VIEW_PRODUCTS: 'view products',
    DELETE_PRODUCTS: 'delete products',
    ADD_PRODUCTS: 'add products',
    UPDATE_PRODUCTS: 'update products'
};

export const Groups: any = {
    ADMIN: 'admin',
    USER: 'user'
};


