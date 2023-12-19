"use client";

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css";
import { useGetMoviesQuery } from '@/store/api/moviesApi';
import Link from 'next/link';
import CartSkeleton from '../shared/skeleton/CartSkeleton';

const UpComingMovies = () => {
    const { data, isLoading, isError } = useGetMoviesQuery([])
    return (
        <div className='mt-32'>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-blue-600">UPCOMING <span className=' text-white'>MOVIES</span></h2>
                <p className='mt-2 text-xs text-yellow-500'>ENJOY UPCOMING MOVIES WITH MOVIE.COM</p>
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={5}
                autoplay={true}
            >
                {isLoading ? <CartSkeleton /> : data?.length && data?.map((item: any) => (
                    <SwiperSlide className="" key={item._id}>
                        <Link href={`/${item._id}`}>
                            <div className="hover:scale-110 hover:border-2 relative w-full duration-300 border-blue-500 rounded-lg">
                                <img src={item.poster} alt="" className='h-80 w-full' />
                                <div className='bg-black/50 absolute bottom-0 w-full py-2 text-center rounded-b-lg'>
                                    <h4 className=' text-white'>{item.name}</h4>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default UpComingMovies