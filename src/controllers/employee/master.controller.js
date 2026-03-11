import { createEmployeeService } from "../../services/employee.service.js";

export async function createEmployeeHandler(req, res) {
    try {
        const employeeData = req.body;
        const {success, message, data} = await createEmployeeService(employeeData);

        return res.status(success ? 201 : 200).json({ success, message, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create employee, please try again later', data: {} });
    }
}