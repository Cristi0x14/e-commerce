import { ColorSizes } from "./colorSize.model";
import { FileHandle } from "./file-handle.model";

export interface Product {
    productId :any;
    productName : string;
    productDescription: string;
    productDiscountedPrice: number;
    productActualPrice: number;
    category:string;
    brand:string;
    gender:string;
    productImages : FileHandle[];
    colorSizes: ColorSizes[];
}