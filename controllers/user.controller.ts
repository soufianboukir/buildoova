import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import { IUser } from "@/models/user.model";
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        await dbConnection();
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error while fetching the user:", error);
        return null;
    }
};

type AuthUser = {
    email?: string;
    name?: string | null;
    image?: string | null;
  };
  
  export const createUserIfNotExists = async (user: AuthUser) => {
        try {
            if (!user.email) return;
            await dbConnection();
            const existingUser = await User.findOne({ email: user.email });
    
            if (!existingUser) {
                const newUser = new User({
                    email: user.email,
                    name: user.name || "",
                    image: user.image || "",
                });
        
                await newUser.save();
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
  };
