const pool = require("../config/db");

const getAllTicketcomments = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ticket_comments ORDER BY created_at DESC");

        res.status(200).json({
            message: "Ticketcomments fetched successfully.",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.error("Get All Ticketcomments Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// GET /api/Ticketcomments/:id - Get Ticketcomments By ID
// ==========================================
const getTicketcommentsById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query("SELECT * FROM ticket_comments WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Ticketcomments not found." });
        }

        res.status(200).json({
            message: "Ticketcomments fetched successfully.",
            data: rows[0],
        });
    } catch (error) {
        console.error("Get Ticketcomments By ID Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// POST /api/Ticketcomments - Create Ticketcomments
// ==========================================
const createTicketcomments = async (req, res) => {
    try {
        const {ticket_id, user_id , comment} = req.body;

        // Validate input
        if (!title || !description || !status || !priority || !created_by || !assigned_to) {
            return res.status(400).json({ message: "All fields (ticket_id, user_id , comment) are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO ticket_comments (ticket_id, user_id , comment ) VALUES (?, ?, ?)",
            [title, description, status, priority, created_by, assigned_to]
        );

        res.status(201).json({
            message: "Ticketcomments created successfully.",
            data: { id: result.insertId,ticket_id, user_id , comment},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticketcomments with this email already exists." });
        }
        console.error("Create Ticketcomments Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// PUT /api/Ticketcomments/:id - Update Ticketcomments
// ==========================================
const updateTicketcomments = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticket_id, user_id , comment } = req.body;

        // Validate input
        if (!title || !description || !status || !priority || !created_by || !assigned_to) {
            return res.status(400).json({ message: "All fields (ticket_id, user_id , comment) are required." });
        }

        // Check if Ticketcomments exists
        const [existing] = await pool.query("SELECT id FROM ticket_comments WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticketcomments not found." });
        }

        await pool.query(
            "UPDATE ticket_comments SET ticket_id = ?, user_id = ?, comment = ? WHERE id = ?",
            [ticket_id, user_id, comment, id]
        );

        res.status(200).json({
            message: "Ticketcomments updated successfully.",
            data: { id: Number(id), ticket_id, user_id , comment},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticketcomments with this title already exists." });
        }
        console.error("Update Ticketcomments Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// DELETE /api/Ticketcomments/:id - Delete Ticketcomments
// ==========================================
const deleteTicketcomments = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if Ticketcomments exists
        const [existing] = await pool.query("SELECT id FROM ticket_comments WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticketcomments not found." });
        }

        await pool.query("DELETE FROM ticket_comments WHERE id = ?", [id]);

        res.status(200).json({ message: "Ticketcomments deleted successfully." });
    } catch (error) {
        console.error("Delete Ticketcomments Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    getAllTicketcomments,
    getTicketcommentsById,
    createTicketcomments,
    updateTicketcomments,
    deleteTicketcomments,
};

