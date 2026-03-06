import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';

export async function adminseed() {
  if (process.env.ENVIRONMENT === 'development') {
    try {
      const getAdminData = await User.findOne({
        role: 'admin',
      });

      console.log(chalk.yellow(`admin details: ${getAdminData}`));

      const hashedPassword = await bcrypt.hash('admin@123', 12);

      if (!getAdminData) {
        const response = await User.create({
          username: 'Admin',
          fullname: 'shouvik das',
          password: hashedPassword,
          role: 'admin',
        });

        console.log(
          chalk.green(
            `Admin details created successfully. Details: ${response}`
          )
        );
      }
    } catch (error) {
      console.error(chalk.red(`Error while creating admin: ${error}`));
    }
  }
}
