const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
    getAllTicketstatueslogs,
    getTicketstatueslogsById,
    createTicketstatueslogs,
    updateTicketstatueslogs,
    deleteTicketstatueslogs,
} = require("../controllers/ticketstatueslogsController");

/**
 * @swagger
 * tags:
 *   name: Status Logs
 *   description: Ticket status transition logs API
 */

// Apply JWT middleware to ALL Status Log routes
router.use(verifyToken);

/**
 * @swagger
 * /api/status-logs:
 *   get:
 *     summary: Get all status logs
 *     tags: [Status Logs]
 *     responses:
 *       200:
 *         description: List of status logs
 */
router.get("/", getAllTicketstatueslogs);

/**
 * @swagger
 * /api/status-logs/{id}:
 *   get:
 *     summary: Get status log by ID
 *     tags: [Status Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status log details
 */
router.get("/:id", getTicketstatueslogsById);

/**
 * @swagger
 * /api/status-logs:
 *   post:
 *     summary: Create a new status log
 *     tags: [Status Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Status log created
 */
router.post("/", createTicketstatueslogs);

/**
 * @swagger
 * /api/status-logs/{id}:
 *   put:
 *     summary: Update a status log
 *     tags: [Status Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Status log updated
 */
router.put("/:id", updateTicketstatueslogs);

/**
 * @swagger
 * /api/status-logs/{id}:
 *   delete:
 *     summary: Delete a status log
 *     tags: [Status Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status log deleted
 */
router.delete("/:id", deleteTicketstatueslogs);

module.exports = router;
