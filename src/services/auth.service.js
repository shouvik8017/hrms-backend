import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

export async function loginValidate(username, password) {
  try {
    const userExists = await User.findOne({ username }).select('+password');

    if (!userExists) throw new Error('User not found');

    const passwordMatched = await bcrypt.compare(password, userExists.password);

    if (!passwordMatched) throw new Error('Password not matched');

    const { accessToken, refreshToken } = generateToken(userExists);

    const loginDetails = {
      username: userExists.username,
      fullname: userExists.fullname,
      role: userExists.role,
      accessToken,
      refreshToken,
    };

    return {
      success: true,
      message: 'Login successfully done',
      data: loginDetails,
    };
  } catch (error) {
    return { success: false, message: error.message, data: {} };
  }
}
