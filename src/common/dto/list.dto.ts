import { Transform } from 'class-transformer'
import { IsInt, IsPositive } from 'class-validator'
import { toNumber } from '../lib/to-number'


export class ListDto
{
    @Transform(({ value }) => toNumber(value))
    @IsInt()
    @IsPositive()
    readonly page: number

    @Transform(({ value }) => toNumber(value))
    @IsInt()
    @IsPositive()
    public limit: number
}