"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CloseIcon from '@/components/icon/CloseIcon'
import ReactStars from 'react-rating-star-with-type'
import StarOutlinceIcon from "../icon/StarOutlinceIcon";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useCreateRatingMutation } from "@/store/api/moviesApi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation"

const Rating = ({ movieId = "" }) => {
    const [open, setOpen] = useState(false);
    const [rate, setRate] = useState(0);
    const user = useAppSelector((state) => state.auth.user)
    const [addRating, { isLoading, isSuccess, error }] = useCreateRatingMutation()
    const { toast } = useToast();
    const router = useRouter();


    //error message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
            setOpen(false)
        }
    }, [error]);


    //success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Rating Successful",
                variant: "success",
            });
            setOpen(false)

        }
    }, [isSuccess]);


    const handleMovieRating = () => {
        if (!user) return router.push("/sign-in")
        addRating({ rating: rate, userId: user?.id, movieId: movieId })

    }

    return (
        <div className="">
            <h4>YOUR RATING</h4>
            <div className="hover:bg-slate-700 px-1 py-0 rounded cursor-pointer">
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild >
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

                            <Button disabled={isLoading} className='w-full' onClick={handleMovieRating}>{isLoading ? "Loading" : "Rate"}</Button>
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