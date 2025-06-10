import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    username?: string;
    siteName?: string;
    code?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        username: { type: String, unique: true },
        siteName: { type: String },
        code: { String}
    },
    {
        timestamps: true,
    }
);
  
const User = models?.User || mongoose.model<IUser>('User',UserSchema);
export default User;
