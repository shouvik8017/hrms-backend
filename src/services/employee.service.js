import User from "../models/user.model.js";
import bycrypt from "bcrypt";

export async function createEmployeeService(employeeData, LoginUserId) {
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
            department,
            createdBy: LoginUserId,
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

export async function updateEmployeeService(employeeData, LoginUserId) {
    try {
        const { id, username, password, fullname, role, designation, department } = employeeData;

        const employee = await User.findById(id);

        if (!employee) {
            return {
                success: false,
                message: 'Employee not found',
                data: {}
            };
        }

        // Update employee details
        employee.username = username ? username.toLowerCase() : employee.username;
        employee.fullname = fullname ? fullname.toUpperCase() : employee.fullname;
        employee.role = role ? role : employee.role;
        employee.designation = designation ? designation : employee.designation;
        employee.department = department ? department : employee.department;
        employee.updatedBy = LoginUserId;

        if (password) {
            employee.password = await bycrypt.hash(password, 12);
        }

        await employee.save();

        return {
            success: true,
            message: 'Employee updated successfully',
            data: employee
        };

    } catch (error) {
        return {
            success: false,
            message: 'Failed to update employee, please try again later',
            data: {}
        };
    }
}

export async function toggleEmployeeStatusService(employeeId, LoginUserId) {
    try {

        const employee = await User.findById(employeeId);

        if (!employee) {
            return {
                success: false,
                message: 'Employee not found',
                data: {}
            };
        }

        // Toggle employee status
        employee.status = !employee.status;
        employee.updatedBy = LoginUserId;

        await employee.save();

        return {
            success: true,
            message: `Employee status updated to ${employee.status ? 'active' : 'inactive'} successfully`,
            data: employee
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update employee status, please try again later',
            data: {}
        };
    }
}

export async function getAllEmployeeService(limit, page, search) {
    try {
        
        const query = search ? {
            $or: [
                { username: { $regex: search, $options: 'i' } },
                { fullname: { $regex: search, $options: 'i' } },
                { role: { $regex: search, $options: 'i' } },
                { designation: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } },
            ]
        } : {};

        const employees = await User.find(query).limit(limit).skip((page - 1) * limit);
        const totalEmployees = await User.countDocuments(query);

        return {
            success: true,
            message: 'Employees retrieved successfully',
            data: {
                employees,
                pagination: {
                    total: totalEmployees,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(totalEmployees / limit)
                }
            }
        };

    } catch (error) {
        return {
            success: false,
            message: 'Failed to retrieve employees, please try again later',
            data: {}
        };
    }
}