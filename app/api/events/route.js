import connectDB from '@/app/lib/mongodb';
import {NextRequest, NextResponse} from 'next/server';
import Event from '@/database/event.model';
import {v2 as cloudinary} from 'cloudinary';
import events from '@/app/lib/constants';

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {message: 'Inalid JSON data format'},
        {status: 400}
      );
    }
    // get image file
    const file = formData.get('image');
    if (!file)
      return NextResponse.json(
        {message: 'Image file is required'},
        {status: 400}
      );

    let tags = JSON.parse(formData.get('tags'));
    let agenda = JSON.parse(formData.get('agenda'));

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {resource_type: 'image', folder: 'DevEvent'},
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;
    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });
    return NextResponse.json(
      {message: 'Event created successfully', event: createdEvent},
      {status: 201}
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Event Creation Faileed',
        error: error.message,
      },
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({createdAt: -1});
    return NextResponse.json(
      {message: 'Events Fetched Successfully', events},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
      {message: 'Event Fetching Failes', error: error},
      {status: 500}
    );
  }
}
