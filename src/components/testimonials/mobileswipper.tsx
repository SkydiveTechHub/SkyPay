


import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './card';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

export default function Mobileswipper() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        pagination={{
          clickable: true,
          el: ''
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {cardData?.map((item) => (
        <SwiperSlide key={item.id}>
          <Card name={item.name} text={item.text} />
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}



interface CardType {
    id: number;
    name: string;
    text: string;
  }
  
  const cardData: CardType[] = [
    {
      id: 1,
      name: "Rejoice okon",
      text: "Amazing app! The data bundles are affordable, and the app is intuitive. Plus, the customer support team is responsive and helpful. Definitely my favorite",
    },
    {
      id: 2,
      name: "Joy",
      text: "Simple, efficient, and reliable platform. The data and airtime refills are instant. Great app!",
    },
    {
      id: 3,
      name: "Oye",
      text: "Fantastic app! I've tried others, but this one stands out. Quick transactions, no extra charges, highly satisfied!",
    },
    {
      id: 4,
      name: "Oye",
      text: "Fantastic app! I've tried others, but this one stands out. Quick transactions, no extra charges, highly satisfied!",
    },
    {
      id: 5,
      name: "Oye",
      text: "Fantastic app! I've tried others, but this one stands out. Quick transactions, no extra charges, highly satisfied! ",
    },
  ];

