import PlayCircleIcon from '@/components/icon/PlayCircleIcon'
import StarSolidIcon from '@/components/icon/StarSolidIcon'
import Container from '@/components/shared/Container'
import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CloseIcon from '@/components/icon/CloseIcon'
import Rating from '@/components/home/Rating'

type ParamsProps = {
    params: {
        slug: string
    }
}

const getMovie = async (movieId: string) => {
    console.log(movieId)
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movie/get-movie/${movieId}`, { cache: "no-cache" })

        return result.json()
    } catch (error) {
        throw Error("something went wrong")
    }
}



const MovieDetails = async ({ params: { slug } }: ParamsProps) => {
    const movieData = await getMovie(slug)
    return (
        <Container>
            <div className="pt-28 flex justify-between">
                <div className="">
                    <h2 className='text-3xl font-bold text-white uppercase'>{movieData?.name}</h2>
                    <h4 className='mt-1 text-sm text-white'>Duration: {movieData.duration} m</h4>
                </div>

                <div className="flex gap-6 text-white">
                    {/* movie rating */}
                    <div className="">
                        <h4>RATING</h4>
                        <div className="hover:bg-slate-700 flex items-center gap-2 px-1 py-0 rounded cursor-pointer">
                            <StarSolidIcon className='w-6 h-6 text-yellow-500' />
                            <h3 className='mt-2 text-lg'>9.3 <sup className='text-gray-300'>/10</sup></h3>
                        </div>
                    </div>

                    {/* your rating */}
                    <Rating />
                </div >
            </div >
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 mt-4">
                <div className="">
                    <img src={movieData?.image1} alt="" className='w-full h-[400px] object-cover' />
                </div>
                <div className="relative">
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                            <div className="">
                                <img src={movieData?.poster} alt="" className='w-full h-[400px] object-cover cursor-pointer' />
                                <div className="absolute top-[50%] left-[50%] translate-[-50%,-50%]">
                                    <PlayCircleIcon className='w-14 h-14 text-white' />
                                </div>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className=' p-1 bg-black border-blue-500'>
                            <div className="">
                                <video className='w-full h-full rounded-lg' controls autoPlay>
                                    <source src={movieData?.trailer_video_link} type="video/mp4" />
                                    <source src="movie.ogg" type="video/ogg" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="-top-4 -right-8 absolute">
                                <AlertDialogCancel className='outline-none'>
                                    <CloseIcon className='w-6 h-6 text-red-500' />
                                </AlertDialogCancel>

                            </div>
                        </AlertDialogContent>

                    </AlertDialog>



                </div>
                <div className="">
                    <img src={movieData?.image2} alt="" className='w-full h-[400px]object-cover' />
                </div>
            </div>

            {/* movie details */}
            <div className="mt-6">
                <p className='text-sm font-semibold text-white'>{movieData?.description}</p>

                <div className="gap-x-4 flex items-end mt-4 text-white">
                    <h4>Director</h4>
                    <div className='gap-x-3 flex text-sm text-blue-500'>{movieData?.director?.map((item: any) => <p className='' key={item._id}>{item}</p>)}</div>
                </div>

                <div className="gap-x-4 flex items-end py-2 text-white">
                    <h4>Writers</h4>
                    <div className='gap-x-3 flex text-sm text-blue-500'>{movieData?.writers?.map((item: any) => <p key={item._id}>{item}</p>)}</div>
                </div>

                <div className="gap-x-4 flex items-end text-white">
                    <h4>Actors</h4>
                    <div className='gap-x-3 flex text-sm text-blue-500'>{movieData?.actors?.map((item: any) => <p key={item._id}>{item}</p>)}</div>
                </div>
            </div>
        </Container >
    )
}

export default MovieDetails