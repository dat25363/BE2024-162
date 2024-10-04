"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = exports.Permissions = exports.STATUS_CODES = exports.Routes = exports.MESSAGES = exports.TOKEN = exports.USER_DATA = exports.FIREBASE = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.FIREBASE = {
    STORAGE_BUCKET: process.env.FIREBASE_BUCKET
};
exports.USER_DATA = {
    ID: process.env.USER_ID,
    NAME: process.env.USER_NAME,
    GROUP: process.env.USER_GROUP
};
exports.TOKEN = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_TIME: process.env.EXPIRE_TIME
};
exports.MESSAGES = {
    UNAUTHORIZED: 'Unauthorized',
    BAD_REQUEST: 'Bad Request',
    FORBIDDEN: 'Forbidden',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_FOUND: 'Not Found',
    OK: 'Operation successful'
};
exports.Routes = {
    ROOT: '/',
    API_SEARCH_PRODUCT: '/api/product-search',
    SWAGGER: '/api-docs'
};
exports.STATUS_CODES = {
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
exports.Permissions = {
    VIEW_PRODUCTS: 'view products',
    DELETE_PRODUCTS: 'delete products',
    ADD_PRODUCTS: 'add products',
    UPDATE_PRODUCTS: 'update products'
};
exports.Groups = {
    ADMIN: 'admin',
    USER: 'user'
};
