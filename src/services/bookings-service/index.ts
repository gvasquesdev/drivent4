import  hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository  from "@/repositories/enrollment-repository";
import { notFoundError, forbiddenError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number) {
  const bookingExists = await bookingRepository.findBooking(userId);
  if(!bookingExists) {
    throw notFoundError;
  }

  return bookingExists;
}

async function createBookings(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw forbiddenError;
  }
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)  throw forbiddenError;
  
  const bookingExists =  await bookingRepository.findBooking(userId);
  if(bookingExists) {
    throw forbiddenError;
  } 

  const room = await hotelRepository.findRoomById(roomId);
  if(!room) {
    throw notFoundError;
  }

  const checkRoomCapacity = await bookingRepository.countRoomCapacity(roomId);
  if(checkRoomCapacity >= room.capacity) {
    throw forbiddenError;
  }

  const bookingCreation = await bookingRepository.insertBooking(userId, roomId);
  return bookingCreation;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) {
    throw forbiddenError;
  }

  const room = await hotelRepository.findRoomById(roomId);
  if(!room) {
    throw notFoundError;
  }

  const checkRoomCapacity = await bookingRepository.countRoomCapacity(roomId);
  if(checkRoomCapacity >= room.capacity) {
    throw forbiddenError;
  }

  const bookingUpdate = await bookingRepository.updateBooking(bookingId, roomId);
  return bookingUpdate;
}

const bookingService = {
  getBooking,
  createBookings,
  updateBooking
};

export default bookingService;
