export interface Product {
    id: number;
    product_name: string;
    price: number;
    release_year: number;
    isSold: boolean;
    img: string | null;
    brand: {
      id: number;
      brand_name: string;
    };
  }

export interface SearchParams {
    keyword?: string;
    city?: string;
    condition?: string;
    brand?: string;
    release_year_above?: number;
    release_year_below?: number;
    min_price?: number;
    max_price?: number;
    page?: number;
  }