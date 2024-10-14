import { 
    IsString,
    IsInt,
    MinLength,
    IsPositive,
    IsIn
 } from 'class-validator'

export class CreateMovementDto {
    @IsString()
    @MinLength(1)
    @IsIn(['entrada', 'salida'], {
        message: "The movement type must be 'entrada' or 'salida'"
    })
    type: string

    @IsInt()
    @IsPositive()
    quantity: number

    @IsInt()
    categoryid: number

    @IsInt()
    productid: number
}