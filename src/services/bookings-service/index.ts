import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBookings(userId: number) {
  const bookingExists = await bookingRepository.findBooking(userId);
  if(!bookingExists) {
    throw notFoundError;
  }

  return bookingExists;
}

const bookingService = {
  getBookings,
};

export default bookingService;
