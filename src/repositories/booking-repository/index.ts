import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true,
    }
  });
}

async function insertBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId
    }
  });
}

async function countRoomCapacity(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId
    }
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    }, data: {
      roomId
    }
  });
}

const bookingRepository = {
  findBooking,
  insertBooking,
  countRoomCapacity,
  updateBooking
};

export default bookingRepository;

