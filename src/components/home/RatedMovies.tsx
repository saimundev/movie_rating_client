"use client";

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/swiper-bundle.css";
import Container from '../shared/Container';
import RightArrow from '../icon/RightArrow';
import LeftArrow from '../icon/LeftArrow';
import MovieCart from '../shared/MovieCart';
import { useGetMoviesQuery } from '@/store/api/moviesApi';
import CartSkeleton from '../shared/skeleton/CartSkeleton';

const RatedMovies = () => {
    const { data, isLoading, isError } = useGetMoviesQuery([])

    return (
        <Container className='relative mt-32'>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-blue-600">MOVIES  <span className=' text-white'>RATING</span></h2>
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
                className="relative"
            >
                <div className="">
                    {isLoading ? <CartSkeleton /> : data?.length && data?.map((item: any) => (
                        <SwiperSlide key={item._id}>
                            <MovieCart data={item} />
                        </SwiperSlide>
                    ))}
                </div>


            </Swiper>
            {/* custom button style */}
            {data?.length >= 6 && <div className="">
                <div className="button_next_slide place-items-center absolute top-[60%] left-[104px] z-40 grid w-12 h-12 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                    <RightArrow className='w-7 h-7' />
                </div>
                <div className="button_prev_slide place-items-center absolute top-[60%] right-[104px] z-40 grid w-12 h-12 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                    <LeftArrow className='w-7 h-7' />
                </div>
            </div>
            }
        </Container>
    )
}

export default RatedMovies