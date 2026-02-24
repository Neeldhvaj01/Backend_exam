require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Route imports
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const statusLogRoutes = require("./routes/ticketstatueslogsRoutes");
const commentRoutes = require("./routes/ticketcommentsRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Support CRUD & Ticketing API",
            version: "1.0.0",
            description: "API documentation for Ticket Support system",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

console.log("Starting server initialization...");

const swaggerDocs = swaggerJsdoc(swaggerOptions);
console.log("Swagger JSDoc generated.");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log("Swagger UI mounted at /api-docs.");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/status-logs", statusLogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "Support Ticket CRUD API is running!",
        docs: `http://localhost:${PORT}/api-docs`
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Something went wrong." });
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    console.log("Swagger UI available at http://localhost:" + PORT + "/api-docs");
});
