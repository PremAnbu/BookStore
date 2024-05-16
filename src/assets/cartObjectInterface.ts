export interface cartObject{
    cartId:number;
    bookId?: number;
    title?: string;
    author?: string;
    imagePath?:string;
    price?:number;
    bookRating?:string;
    description?:string;
    quantity:number;
    bookQuantity:number;
}