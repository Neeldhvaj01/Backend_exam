const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
    getAllTicketcomments,
    getTicketcommentsById,
    createTicketcomments,
    updateTicketcomments,
    deleteTicketcomments,
} = require("../controllers/ticketcommentsController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Ticket comments management API
 */

// Apply JWT middleware to ALL Comment routes
router.use(verifyToken);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all ticket comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/", getAllTicketcomments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment details
 */
router.get("/:id", getTicketcommentsById);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/", createTicketcomments);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
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
 *         description: Comment updated
 */
router.put("/:id", updateTicketcomments);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:id", deleteTicketcomments);

module.exports = router;
