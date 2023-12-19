import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const CartSkeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-5">
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  )
}

export default CartSkeleton