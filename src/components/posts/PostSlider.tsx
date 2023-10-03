"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Post } from "@/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PostSlider = ({ post }: { post: Post }) => {
  const getYouTubeVideoID = (link: string) => {
    let videoID;

    switch (true) {
      case link.includes("youtube.com/watch?v="):
        videoID = link.split("youtube.com/watch?v=")[1].split("&")[0];
        break;

      case link.includes("youtube.com/shorts/"):
        videoID = link.split("youtube.com/shorts/")[1];
        break;

      default:
        videoID = null;
    }

    return videoID;
  };

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="h-[300px] w-full rounded-lg lg:h-[400px] lg:w-[650px]"
      modules={[Pagination, Navigation]}
    >
      {post.img && (
        <SwiperSlide key="image">
          <div className="relative h-[300px] w-full lg:h-[400px] lg:w-[650px]">
            <Image
              src={post.img}
              alt="post image"
              fill
              className="aspect-square"
            />
          </div>
        </SwiperSlide>
      )}

      {post.videoURL && (
        <>
          <SwiperSlide key="video">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                post.videoURL,
              )}`}
              width="650"
              height="400"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="hidden lg:block"
            />
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                post.videoURL,
              )}`}
              width="300"
              height="300"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="lg:hidden"
            />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
};

export default PostSlider;
