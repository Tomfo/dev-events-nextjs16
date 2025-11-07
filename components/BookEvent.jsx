'use client';

import {createBooking} from '@/app/lib/actions/booking.actions';
import {useState} from 'react';

const BookEvent = ({eventId, slug}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {success, error} = await createBooking({eventId, slug, email});
    if (success) {
      setSubmitted(true);
    } else {
      console.log('Booking creation failed', error);
    }
  };
  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              placeholder='Enter Your email address'
            />
          </div>
          <button type='submit' className='button-submit'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
