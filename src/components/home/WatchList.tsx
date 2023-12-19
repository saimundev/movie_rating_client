"use client";

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/swiper-bundle.css";
import Container from '../shared/Container';
import RightArrow from '../icon/RightArrow';
import LeftArrow from '../icon/LeftArrow';
import MovieCart from '../shared/MovieCart';

const WatchList = () => {
    return (
        <Container className='relative mt-32'>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-blue-600">UPCOMING <span className=' text-white'>MOVIES</span></h2>
                <p className='mt-2 text-xs text-yellow-500'>ENJOY UPCOMING MOVIES WITH MOVIE.COM</p>
            </div>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={{
                    nextEl: ".button_next_slide",
                    prevEl: ".button_prev_slide"
                }}
                className=""
            >
                <div className="">
                    <SwiperSlide >
                        <MovieCart />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://c4.wallpaperflare.com/wallpaper/852/644/1008/alien-movie-poster-sigourney-weaver-movie-poster-wallpaper-preview.jpg" alt="" className='' />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://c4.wallpaperflare.com/wallpaper/852/644/1008/alien-movie-poster-sigourney-weaver-movie-poster-wallpaper-preview.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" alt="" />
                    </SwiperSlide>
                </div>


            </Swiper>
            {/* custom button style */}
            <div className="button_next_slide place-items-center absolute top-[50%] left-[104px] z-50 grid w-12 h-12 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                <RightArrow className='w-7 h-7' />
            </div>
            <div className="button_prev_slide place-items-center absolute top-[50%] right-[104px] z-50 grid w-12 h-12 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                <LeftArrow className='w-7 h-7' />
            </div>
        </Container>
    )
}

export default WatchList