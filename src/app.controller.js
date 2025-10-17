
import connectDB from "./DB/connection.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
import morgan from "morgan";

// Import routers
import authRouter from "./modules/auth/auth.controller.js";
import usersRouter from "./modules/users/users.controller.js";
import contentRouter from "./modules/content/content.controller.js";

const bootstrap = async (app, express) => {
  // Connect to database
  await connectDB();
  app.use(express.json());

  // Enable CORS for frontend communication
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Use Morgan middleware for logging HTTP requests in the "dev" format
  app.use(morgan("dev"));

  // Serve static files from the "uploads" directory when accessing the "/uploads" route
  app.use("/uploads", express.static("uploads"));

  // Routes
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/content", contentRouter);

  // Handle all undefined routes with a custom "not found" handler
  app.all("*", notFoundHandler);

  // Use a global error handler for centralized error management
  app.use(globalErrorHandler);
};

export default bootstrap;
    