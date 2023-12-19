"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CloseIcon from '@/components/icon/CloseIcon'
import ReactStars from 'react-rating-star-with-type'
import StarOutlinceIcon from "../icon/StarOutlinceIcon";
import { useState } from "react";

const Rating = () => {
    const [rate, setRate] = useState(0);

    return (
        <div className="">
            <h4>YOUR RATING</h4>
            <div className="hover:bg-slate-700 px-1 py-0 rounded cursor-pointer">
                <AlertDialog >
                    <AlertDialogTrigger asChild>
                        <div className="flex items-center gap-2">
                            <StarOutlinceIcon className='w-6 h-6 text-blue-500' />
                            <h3 className='mt-2 text-lg text-blue-500'>Rate</h3>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="px-10 py-6 text-center bg-black border-blue-500">
                        <div className="">
                            {rate ? <h2 className="text-2xl font-bold text-white">{rate}</h2> : null}
                            <h4 className='text-sm text-yellow-500'>RATE THIS</h4>
                            <h3 className='mt-2 text-xl font-semibold text-white'>The Shawshank Redemption</h3>

                            <div className="flex justify-center py-6">
                                <ReactStars
                                    size={30}
                                    count={10}
                                    value={0}
                                    isEdit={true}
                                    onChange={(value) => setRate(value)}
                                    activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC",]}

                                />
                            </div>

                            <Button className='w-full'>Rate</Button>
                        </div>
                        <div className="-top-4 -right-8 absolute">
                            <AlertDialogCancel className='outline-none'>
                                <CloseIcon className='w-6 h-6 text-red-500' />
                            </AlertDialogCancel>

                        </div>
                    </AlertDialogContent>

                </AlertDialog>


            </div>
        </div>
    )
}

export default Rating