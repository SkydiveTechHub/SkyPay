import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Card from './card';

function Swipe() {
  return (
    <div>
      <SwiperComponent />
    </div>
  );
}

function SwiperComponent() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="bg-transparent"
    >
      {cardData?.map((item) => (
        <SwiperSlide key={item.id}>
          <Card name={item.name} text={item.text} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Swipe;

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
    name: "Anonymous",
    text: "Their products and services are lifesaver! Quick and convenient, and I love the various payment options available.",
  },
  {
    id: 5,
    name: "Anonymous",
    text: "I Love Skypay! Super easy to use, and the data and airtime top-up happens instantly. Highly recommended!",
  }
];
