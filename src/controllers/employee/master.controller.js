import { 
    createEmployeeService, 
    updateEmployeeService,
    toggleEmployeeStatusService,
    getAllEmployeeService
} from "../../services/employee.service.js";

export async function createEmployeeHandler(req, res) {
    try {
        const employeeData = req.body;
        const LoginUserId = req.user.id;
        const {success, message, data} = await createEmployeeService(employeeData, LoginUserId);

        return res.status(success ? 201 : 200).json({ success, message, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create employee, please try again later', data: {} });
    }
}

export async function updateEmployeeHandler(req, res) {
    try {
        const employeeData = req.body;
        const LoginUserId = req.user.id;
        const {success, message, data} = await updateEmployeeService(employeeData, LoginUserId);

        return res.status(200).json({ success, message, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to update employee, please try again later', data: {} });
    }
}

export async function toggleEmployeeStatusHandler(req, res) {
    try {
        const employeeId = req.params.empId;
        const LoginUserId = req.user.id;
        const {success, message, data} = await toggleEmployeeStatusService(employeeId, LoginUserId);

        return res.status(200).json({ success, message, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to update employee status, please try again later', data: {} });
    }
}

export async function getAllEmployeeHandler(req, res) {
    try {
        const { limit, page, search } = req.query;
        const {success, message, data} = await getAllEmployeeService(limit, page, search);

        return res.status(200).json({ success, message, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to retrieve employees, please try again later', data: {} });
    }
}