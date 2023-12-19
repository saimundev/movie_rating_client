"use client";

import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation } from "swiper/modules"
import RightArrow from '../icon/RightArrow';
import LeftArrow from '../icon/LeftArrow';
import { Button } from '../ui/button';
import { useGetMoviesQuery } from '@/store/api/moviesApi';
import Link from 'next/link';


const Banner = () => {
    const { data, isLoading, isError } = useGetMoviesQuery([])
    return (
        <div>
            <div className="w-full h-screen">
                <div className='bg-banner_image bg-blend-overlay bg-black/80 -z-50 w-full h-full' >
                    <div className="grid grid-cols-[2fr_1fr] items-center h-full px-32">
                        <div className="">
                            <h1 className='text-6xl font-bold leading-tight text-blue-500'>FIND YOUR <br /> ENTERTAINMENT </h1>
                            <h2 className='mt-7 text-3xl font-semibold leading-relaxed text-white'>MOVIES AS YOUR DEMAND AT BD <br /> <span className='text-yellow-500'>500/MONTH</span> </h2>
                        </div>

                        {/* slicer image  */}
                        <div className="relative">
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={10}
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                navigation={{
                                    nextEl: ".button_next_slide",
                                    prevEl: ".button_prev_slide"
                                }}
                                autoplay={true}
                                className='w-80'
                            >
                                {data?.length && data?.map((item: any) => (
                                    <SwiperSlide className='relative' key={item._id}>
                                        <img src={item.poster} alt="" className='h-[450px] w-full my-10' />

                                        <div className="bottom-5 absolute flex justify-center w-full">
                                            <Button asChild className='z-50 rounded-full' size="lg">
                                                <Link href={`/${item._id}`}>
                                                    WATCH NOW
                                                </Link>
                                            </Button>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                            {/* custom button style */}
                            <div className="button_next_slide place-items-center absolute top-[50%] left-0 z-40 grid w-10 h-10 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                                <RightArrow className='w-6 h-6' />
                            </div>
                            <div className="button_prev_slide place-items-center absolute top-[50%] right-0 z-40 grid w-10 h-10 bg-white rounded-lg translate-y-[-50%] cursor-pointer">
                                <LeftArrow className='w-6 h-6' />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Banner