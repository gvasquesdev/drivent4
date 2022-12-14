import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, postBooking, updateBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBooking)
  .put("/:bookingId", updateBooking);

export { bookingsRouter };
