import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';

export async function adminseed() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const getAdminData = await User.findOne({
        role: 'admin',
      });

      console.log(chalk.yellow(`[ADMIN DETAILS]: ${getAdminData}`));

      if (!getAdminData) {
        const hashedPassword = await bcrypt.hash('admin@123', 12);
        const response = await User.create({
          username: 'Admin',
          fullname: 'shouvik das',
          password: hashedPassword,
          role: 'admin',
        });

        console.log(
          chalk.green(
            `[ADMIN DETAILS CREATED]: ${response}`
          )
        );
      }
    } catch (error) {
      console.error(chalk.red(`[ERROR WHILE CREATING ADMIN]: ${error}`));
    }
  }
}
