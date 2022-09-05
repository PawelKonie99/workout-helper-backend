import { ResponseCode } from "../enums/responseCode";

///// Api types
export interface INutritionProductResponse {
    foods: IFood[];
}

export interface IFood {
    food_name: string;
    brand_name: null;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: IFullNutrient[];
    nix_brand_name: null;
    nix_brand_id: null;
    nix_item_name: null;
    nix_item_id: null;
    upc: null;
    consumed_at: Date;
    metadata: IMetadata;
    source: number;
    ndb_no: number;
    tags: ITags;
    alt_measures: IAltMeasure[];
    lat: null;
    lng: null;
    meal_type: number;
    photo: IPhoto;
    sub_recipe: null;
    class_code: null;
    brick_code: null;
    tag_id: null;
}

export interface IAltMeasure {
    serving_weight: number;
    measure: string;
    seq: number | null;
    qty: number;
}

export interface IFullNutrient {
    attr_id: number;
    value: number;
}

export interface IMetadata {
    is_raw_food: boolean;
}

export interface IPhoto {
    thumb: string;
    highres: string;
    is_user_uploaded: boolean;
}

export interface ITags {
    item: string;
    measure: string;
    quantity: string;
    food_group: number;
    tag_id: number;
}

/////

export interface IGetProductDataResponse {
    code: ResponseCode;
    success: boolean;
    productData?: IFood[];
}
