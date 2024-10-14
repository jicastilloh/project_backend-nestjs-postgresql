import { 
    IsString,
    MinLength,
    IsInt,
    IsNumber,
    IsPositive
 } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsString()
    description: string
    
    @IsNumber()
    price: number

    @IsInt()
    @IsPositive()
    quantity: number
    
    @IsInt()
    categoryid: number
}