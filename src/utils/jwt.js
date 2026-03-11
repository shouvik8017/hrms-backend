import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const accessToken = jwt.sign(
        {
            id: user._id, role: user.role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
    )

    const refreshToken = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIREIN
        }
    )

    return { accessToken, refreshToken };
};