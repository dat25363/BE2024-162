import { SearchParams } from "../models/Product";
import { Product } from "../models/Product";

export interface ProductInterface {
    productSearch(params: SearchParams): Promise<{ total: number; Products: Product[] }>; 
}