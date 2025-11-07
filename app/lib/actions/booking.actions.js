'use server';

import Booking from '@/database/booking.model';
import connectDB from '../mongodb';
//final
export const createBooking = async ({eventId, slug, email}) => {
  try {
    await connectDB();
    await Booking.create({eventId, slug, email});
    return {success: true};
  } catch (error) {
    console.error('Create booking failed', error);
    return {success: false};
  }
};
