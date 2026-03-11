import User from "../models/user.model.js";
import bycrypt from "bcrypt";

export async function createEmployeeService(employeeData) {
    try {
        const { username, password, fullname, role, designation, department } = employeeData;

        // Check if username is already taken
        const existingUser = await User.findOne({
            username: username.toLowerCase()
        });

        if(existingUser) {
            return {
                success: false,
                message: 'Username is already exists, please choose another one',
                data: {}
            }
        }

        // Hash the password before saving
        const hashedPassword = await bycrypt.hash(password, 12);

        const newEmployee = new User({
            username: username.toLowerCase(),
            password: hashedPassword,
            fullname: fullname.toUpperCase(),
            role,
            designation,
            department
        });

        await newEmployee.save();

        return {
            success: true,
            message: 'Employee created successfully',
            data: newEmployee
        };

    } catch (error) {
        return {
            success: false,
            message: 'Failed to create employee, please try again later',
            data: {}
        };
    }
}
