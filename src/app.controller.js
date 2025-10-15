
import connectDB from "./DB/connection.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
import morgan from "morgan";

// Import routers
import authRouter from "./modules/auth/auth.controller.js";
import adminRouter from "./modules/admin/admin.controller.js";
import usersRouter from "./modules/users/users.controller.js";
import worksRouter from "./modules/works/works.controller.js";
import contentRouter from "./modules/content/content.controller.js";

const bootstrap = async (app, express) => {
  // Connect to database
  await connectDB();
  app.use(express.json());

  // Use Morgan middleware for logging HTTP requests in the "dev" format
  app.use(morgan("dev"));

  // Serve static files from the "uploads" directory when accessing the "/uploads" route
  app.use("/uploads", express.static("uploads"));

  // Routes
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/users", usersRouter);
  app.use("/works", worksRouter);
  app.use("/content", contentRouter);

  // Handle all undefined routes with a custom "not found" handler
  app.all("*", notFoundHandler);

  // Use a global error handler for centralized error management
  app.use(globalErrorHandler);
};

export default bootstrap;
    