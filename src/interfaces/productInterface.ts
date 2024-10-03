import { SearchParams } from "../models/Product";
import { Products } from "@prisma/client";

export interface ProductInterface {
    productSearch(params: SearchParams): Promise<{ total: number; Products: any[] }>; 
}