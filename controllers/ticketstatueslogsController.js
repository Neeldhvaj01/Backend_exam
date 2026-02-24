const pool = require("../config/db");

const getAllTicketstatueslogs = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM ticket_status_logs ORDER BY created_at DESC");

        res.status(200).json({
            message: "Ticketstatueslogs fetched successfully.",
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.error("Get All Ticketstatueslogs Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// GET /api/Ticketstatueslogs/:id - Get Ticketstatueslogs By ID
// ==========================================
const getTicketstatueslogsById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query("SELECT * FROM ticket_status_logs WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Ticketstatueslogs not found." });
        }

        res.status(200).json({
            message: "Ticketstatueslogs fetched successfully.",
            data: rows[0],
        });
    } catch (error) {
        console.error("Get Ticketstatueslogs By ID Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// POST /api/Ticketstatueslogs - Create Ticketstatueslogs
// ==========================================
const createTicketstatueslogs = async (req, res) => {
    try {
        const {ticket_id,old_status,new_status,changed_by} = req.body;

        // Validate input
        if (!ticket_id || !old_status || !new_status || !changed_by ) {
            return res.status(400).json({ message: "All fields (ticket_id,old_status,new_status,changed_by) are required." });
        }

        const [result] = await pool.query(
            "INSERT INTO ticket_status_logs (ticket_id,old_status,new_status,changed_by ) VALUES (?, ?, ?,?)",
            [ticket_id, old_status, new_status, changed_by]
        );

        res.status(201).json({
            message: "Ticketstatueslogs created successfully.",
            data: { id: result.insertId,ticket_id,old_status,new_status,changed_by},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticketstatueslogs with this email already exists." });
        }
        console.error("Create Ticketstatueslogs Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// PUT /api/Ticketstatueslogs/:id - Update Ticketstatueslogs
// ==========================================
const updateTicketstatueslogs = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticket_id,old_status,new_status,changed_by } = req.body;

        // Validate input
        if (!ticket_id || !old_status || !new_status || !changed_by ) {
            return res.status(400).json({ message: "All fields (ticket_id,old_status,new_status,changed_by) are required." });
        }

        // Check if Ticketstatueslogs exists
        const [existing] = await pool.query("SELECT id FROM ticket_status_logs WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticketstatueslogs not found." });
        }

        await pool.query(
            "UPDATE ticket_status_logs SET ticket_id = ?, old_status = ?, new_status = ?, changed_by = ? WHERE id = ?",
            [ticket_id, old_status, new_status, changed_by, id]
        );

        res.status(200).json({
            message: "Ticketstatueslogs updated successfully.",
            data: { id: Number(id), ticket_id,old_status,new_status,changed_by},
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "A Ticketstatueslogs with this title already exists." });
        }
        console.error("Update Ticketstatueslogs Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// ==========================================
// DELETE /api/Ticketstatueslogs/:id - Delete Ticketstatueslogs
// ==========================================
const deleteTicketstatueslogs = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if Ticketstatueslogs exists
        const [existing] = await pool.query("SELECT id FROM ticket_status_logs WHERE id = ?", [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: "Ticketstatueslogs not found." });
        }

        await pool.query("DELETE FROM ticket_status_logs WHERE id = ?", [id]);

        res.status(200).json({ message: "Ticketstatueslogs deleted successfully." });
    } catch (error) {
        console.error("Delete Ticketstatueslogs Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    getAllTicketstatueslogs,
    getTicketstatueslogsById,
    createTicketstatueslogs,
    updateTicketstatueslogs,
    deleteTicketstatueslogs,
};

