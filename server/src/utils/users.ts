import { User } from "../users/user.entities";

export const signup = async () => {
  try {
    const user = new User();
    user.email = process.env.USER_EMAIL as string;
    user.hash = process.env.USER_HASH as string;

    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};
