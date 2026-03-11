import chalk from 'chalk';
import { loginValidate } from '../../services/auth.service.js';

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { success, message, data } = await loginValidate(username, password);

    if (success) {

      console.log(chalk.blue(`[LOGIN ATTEMPT USER DETAILS]: ${JSON.stringify(data)}`));
      console.log(chalk.green(`[LOGIN SUCCESS]: ${username} logged in successfully`));

      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      delete data.refreshToken;

    }

    return res.status(200).json({ success, message, data });
  } catch (error) {
    console.log(chalk.red(`[ERROR DURING LOGIN]: ${error.message}`));

    return res
      .status(500)
      .json({ success: false, message: 'Login failed, please try again later', data: {} });
  }
};
