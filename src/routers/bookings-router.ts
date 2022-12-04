import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/booking", getBookings);

export { bookingsRouter };
