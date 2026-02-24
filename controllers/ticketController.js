const pool = require("../config/db");

const getAllTicket = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Ticket ORDER BY created_at DESC");

        res.status(200).json({
            message: "Ticket fetched successfully.",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.error("Get All Ticket Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// GET /api/Ticket/:id - Get Ticket By ID
// ==========================================
const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query("SELECT * FROM Ticket WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        res.status(200).json({
            message: "Ticket fetched successfully.",
            data: rows[0],
        });
    } catch (error) {
        console.error("Get Ticket By ID Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// POST /api/Ticket - Create Ticket
// ==========================================
const createTicket = async (req, res) => {
    try {
        const {title, description , status , priority, created_by ,assigned_to} = req.body;

        // Validate input
        if (!title || !description || !status || !priority || !created_by || !assigned_to) {
            return res.status(400).json({ message: "All fields (title, description , status , priority, created_by ,assigned_to) are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO Ticket (title, description , status , priority, created_by ,assigned_to ) VALUES (?, ?, ?, ?, ?, ?)",
            [title, description, status, priority, created_by, assigned_to]
        );

        res.status(201).json({
            message: "Ticket created successfully.",
            data: { id: result.insertId,title, description , status , priority, created_by ,assigned_to},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticket with this email already exists." });
        }
        console.error("Create Ticket Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// PUT /api/Ticket/:id - Update Ticket
// ==========================================
const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description , status , priority, created_by ,assigned_to } = req.body;

        // Validate input
        if (!title || !description || !status || !priority || !created_by || !assigned_to) {
            return res.status(400).json({ message: "All fields (title, description , status , priority, created_by ,assigned_to) are required." });
        }

        // Check if Ticket exists
        const [existing] = await pool.query("SELECT id FROM Ticket WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        await pool.query(
            "UPDATE Ticket SET title = ?, description = ?, status = ?, priority = ?, created_by = ?, assigned_to = ? WHERE id = ?",
            [title, description, status, priority, created_by, assigned_to, id]
        );

        res.status(200).json({
            message: "Ticket updated successfully.",
            data: { id: Number(id), title, description , status , priority, created_by ,assigned_to},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticket with this title already exists." });
        }
        console.error("Update Ticket Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// DELETE /api/Ticket/:id - Delete Ticket
// ==========================================
const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if Ticket exists
        const [existing] = await pool.query("SELECT id FROM Ticket WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        await pool.query("DELETE FROM Ticket WHERE id = ?", [id]);

        res.status(200).json({ message: "Ticket deleted successfully." });
    } catch (error) {
        console.error("Delete Ticket Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    getAllTicket,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
};

