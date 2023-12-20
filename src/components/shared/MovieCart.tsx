import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import StarSolidIcon from '../icon/StarSolidIcon'
import PlayCircleIcon from '../icon/PlayCircleIcon'
import { useAppSelector } from '@/store/hooks'
import { useAddWatchListMutation, useRemoveWatchListMutation } from '@/store/api/moviesApi'
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast";

const MovieCart = ({ data = [] }: any) => {
    const user = useAppSelector((state) => state.auth.user)
    const [addList, { isLoading, isSuccess, error }] = useAddWatchListMutation();
    const [removeList, { isSuccess: success }] = useRemoveWatchListMutation()
    const router = useRouter();
    const { toast } = useToast();

    //list create success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Watch list added successful",
                variant: "success",
            });
        }
    }, [isSuccess]);

    //already in list message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
        }
    }, [error]);


    //list remove success message
    useEffect(() => {
        if (success) {
            toast({
                title: "Watch list remove",
                variant: "destructive",
            });
        }
    }, [success]);

    const watchListAction = (id: string) => {
        if (!user) return router.push("/sign-in")
        //api call to save list
        addList({ userId: user?.id, movieId: id })
    }

    const removeListAction = (id: string) => {
        removeList({ listId: id })
    }

    let result = 0;
    let one = 0,
        two = 0,
        three = 0,
        four = 0,
        five = 0,
        six = 0,
        seven = 0,
        eight = 0,
        nine = 0,
        ten = 0,
        total = 0;
    if (data?.reviews?.length > 0) {
        data?.reviews?.forEach((item: any) => {
            if (item.rating === 1) {
                one += 1;
            }
            if (item.rating === 2) {
                two += 1;
            }
            if (item.rating === 3) {
                three += 1;
            }
            if (item.rating === 4) {
                four += 1;
            }
            if (item.rating === 5) {
                five += 1;
            }
            if (item.rating === 6) {
                six += 1;
            }
            if (item.rating === 7) {
                seven += 1;
            }
            if (item.rating === 8) {
                eight += 1;
            }
            if (item.rating === 9) {
                nine += 1;
            }
            if (item.rating === 10) {
                ten += 1;
            }
        });
        total = one + two + three + four + five + six + seven + eight + nine + ten;
        result = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five + 6 * six + 7 * seven + 8 * eight + 9 * nine + 10 * ten) / total;
    } else {
        total = 0;
        result = 0;
    }
    const rating = Number(result).toFixed(1);
    return (
        <div>
            <div className="bg-black/40 rounded-lg">
                <img src={data.poster || data?.movieId?.poster} alt="" className='h-60 w-full rounded-t-lg' />
                <div className='px-3 py-4'>
                    <h4 className=' text-base font-semibold text-white'>{data.name || data?.movieId?.name}</h4>

                    {/* movie rating */}
                    {data?.reviews && <div className="flex items-center gap-2 mt-2">
                        <StarSolidIcon className='w-4 h-4 text-yellow-500' />
                        <div className="gap-x-1 flex text-xs text-white">
                            <div className="">{rating}</div>
                            <div className="">
                                ({data?.reviews?.length && data.reviews.length})
                            </div>

                        </div>
                    </div>}
                    {data?.movieId ? <Button size="sm" className='w-full mt-3 rounded-full' onClick={() => removeListAction(data?._id)}>REMOVE LIST</Button> : <Button size="sm" className='w-full mt-3 rounded-full' onClick={() => watchListAction(data._id)}>WATCH LIST</Button>}
                    <div className="flex gap-4 mt-4">
                        <PlayCircleIcon className='w-4 h-4 text-white' />
                        <h4 className='text-xs font-semibold text-white'>TRAILER</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCart