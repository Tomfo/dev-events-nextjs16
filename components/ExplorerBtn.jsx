'use client';

import Image from 'next/image';

const ExplorerBtn = () => {
  return (
    <button
      type='button'
      id='explore-btn'
      className='mt-7 mx-auto'
      onClick={() => console.log('click me')}
    >
      <a href='#events'>
        Explore Events
        <Image
          src='/icons/arrow-down.svg'
          alt='arroow-down'
          width={24}
          height={24}
        ></Image>
      </a>
    </button>
  );
};
export default ExplorerBtn;
