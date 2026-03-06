import chalk from 'chalk';
import { loginValidate } from '../../services/user.service.js';

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { success, message, data } = await loginValidate(username, password);

    if (success) console.log(chalk.blue(`[RESPONSE]: ${JSON.stringify(data)}`));

    return res.status(200).json({ success, message, data });
  } catch (error) {
    console.log(chalk.red(`[ERROR DURING LOGIN]: ${error.message}`));

    return res
      .status(500)
      .json({ message: 'Login failed, please try again later' });
  }
};
