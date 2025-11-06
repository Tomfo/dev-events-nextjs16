'use server';

import Event from '@/database/event.model';
import connectDB from '../mongodb';

export const getSimilarEventsBySlug = async (slug) => {
  try {
    await connectDB();
    const event = await Event.findOne({slug: slug.trim().toLowerCase()});
    const simillarEvents = await Event.find({
      _id: {$ne: event._id},
      tags: {$in: event.tags},
    }).lean();

    return simillarEvents;
  } catch {
    return [];
  }
};
