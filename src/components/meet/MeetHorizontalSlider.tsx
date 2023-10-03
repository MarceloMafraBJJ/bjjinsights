"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { User } from "@/types";
import { MeetCard } from ".";

const MeetHorizontalSlider = ({ users }: { users: User[] }) => {
  const slidesPerView =
    typeof window !== "undefined" && window?.innerWidth < 1024 ? 1 : 3;

  return (
    <Swiper
      effect={"coverflow"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      initialSlide={1}
      slidesPerView={slidesPerView}
      grabCursor={true}
      centeredSlides={true}
      pagination={{ clickable: true }}
      modules={[Navigation, EffectCoverflow]}
      className="flex items-center justify-center px-10"
    >
      {users?.map((user) => (
        <SwiperSlide
          key={user.id}
          className={`!flex items-center justify-center transition-all duration-300`}
        >
          <MeetCard user={user} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MeetHorizontalSlider;
