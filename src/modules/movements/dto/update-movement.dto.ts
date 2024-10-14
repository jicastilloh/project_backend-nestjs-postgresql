import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementDto } from './create-movement.dto';
import { 
    IsString,
    IsInt,
    MinLength,
    IsPositive
 } from 'class-validator'

export class UpdateMovementDto extends PartialType(CreateMovementDto) {
    @IsString()
    @MinLength(1)
    type?: string

    @IsInt()
    @IsPositive()
    quantity?: number

    @IsInt()
    categoryid?: number;
    
    @IsInt()
    productid?: number;
}
