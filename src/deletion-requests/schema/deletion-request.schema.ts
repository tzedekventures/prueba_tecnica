import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from 'src/users/schema/user.schema'


export type DeletionRequestDocument = DeletionRequest & Document


@Schema({ timestamps: true })
export class DeletionRequest
{
    @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
    public userId: Types.ObjectId

    @Prop({ default: false })
    public processed: boolean
}


export const DeletionRequestSchema = SchemaFactory.createForClass(DeletionRequest)