import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

export enum UserRole
{
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({ timestamps: true })
export class User extends Document
{
    @Prop({ required: true, unique: true })
    public username: string

    @Prop({ required: true, unique: true })
    public email: string

    @Prop({ required: true })
    public password: string

    @Prop({ enum: UserRole, default: UserRole.USER })
    public role: UserRole

    @Prop({ default: true })
    public isActive: boolean

    @Prop({ default: false })
    public deletionRequested: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
