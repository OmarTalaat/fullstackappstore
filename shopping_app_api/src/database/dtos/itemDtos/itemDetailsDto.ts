import { ProductDetailsDto } from "../productDtos/productDetailsDto";

export interface ItemDetailsDto {
    id: number;
    quantity: number;
    product:ProductDetailsDto;
}
