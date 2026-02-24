const pool = require("../config/db");

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users ORDER BY created_at DESC");

        res.status(200).json({
            message: "Users fetched successfully.",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// GET /api/Users/:id - Get User By ID
// ==========================================
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "User fetched successfully.",
            data: rows[0],
        });
    } catch (error) {
        console.error("Get User By ID Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// POST /api/Users - Create User
// ==========================================
const createUser = async (req, res) => {
    try {
        const { name, email, password,role_id } = req.body;

        // Validate input
        if (!name || !email || !password || !role_id) {
            return res.status(400).json({ message: "All fields (name, email, password, role_id) are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO Users (name, email, password,role_id  ) VALUES (?, ?, ?, ?)",
            [name, email, password,role_id]
        );

        res.status(201).json({
            message: "User created successfully.",
            data: { id: result.insertId, name, email, password,role_id },
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A User with this email already exists." });
        }
        console.error("Create User Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// PUT /api/Users/:id - Update User
// ==========================================
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role_id } = req.body;

        // Validate input
        if (!name || !email || !password || !role_id) {
            return res.status(400).json({ message: "All fields (name, email, password, role_id) are required." });
        }

        // Check if User exists
        const [existing] = await pool.query("SELECT id FROM Users WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        await pool.query(
            "UPDATE Users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?",
            [name, email, password, role_id, id]
        );

        res.status(200).json({
            message: "User updated successfully.",
            data: { id: Number(id), name, email, password, role_id },
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A User with this email already exists." });
        }
        console.error("Update User Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// DELETE /api/Users/:id - Delete User
// ==========================================
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if User exists
        const [existing] = await pool.query("SELECT id FROM Users WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        await pool.query("DELETE FROM Users WHERE id = ?", [id]);

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

