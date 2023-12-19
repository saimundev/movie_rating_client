import React from 'react'
import { Button } from '../ui/button'
import StarSolidIcon from '../icon/StarSolidIcon'
import PlayCircleIcon from '../icon/PlayCircleIcon'

const MovieCart = ({ data = [] }: any) => {
    return (
        <div>
            <div className="bg-black/40 rounded-lg">
                <img src={data.poster} alt="" className='h-60 w-full rounded-t-lg' />
                <div className='px-3 py-4'>
                    <h4 className=' text-base font-semibold text-white'>{data.name}</h4>

                    {/* movie rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <StarSolidIcon className='w-4 h-4 text-yellow-500' />
                        <div className="text-xs text-white">8(407)</div>
                    </div>
                    <Button size="sm" className='w-full mt-3 rounded-full'>WATCH LIST</Button>
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