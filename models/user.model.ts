import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    domain?: string;
    subdomain?: string;
    plan: 'free' | 'pro';
    stripeCustomerId?: string;
    isVerified?: boolean;
    analyticsEnabled?: boolean;
    templatesUsed?: string[];
    customThemeSettings?: object;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        domain: { type: String },
        subdomain: { type: String },
        plan: { type: String, enum: ['free', 'pro'], default: 'free' },
        stripeCustomerId: { type: String },
        isVerified: { type: Boolean, default: false },
        analyticsEnabled: { type: Boolean, default: true },
        templatesUsed: [{ type: String }],
        customThemeSettings: { type: Object },
    },
    {
        timestamps: true,
    }
);
  
const User = mongoose.models.user || mongoose.model<IUser>('User', UserSchema); 
export default User;
