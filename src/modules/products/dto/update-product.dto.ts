import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { 
    IsString,
    MinLength,
    IsDecimal,
    IsInt
 } from 'class-validator'

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(3)
    name?: string

    @IsString()
    description?: string
    
    @IsDecimal()
    price?: number

    @IsInt()
    quantity?: number
    
    @IsInt()
    categoryid?: number
}
