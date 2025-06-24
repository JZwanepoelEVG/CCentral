"use client";
import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent } from "@/components/ui/card";
const TicketSkeleton = () => {
    return (
<div className={'animate-pulse'}>
             <div>
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="w-1/12	h-2" />
                    <Skeleton className="w-1/12	h-2" />
                </div>

                <Skeleton className="w-5/6 h-4 mb-1.5" />

                <Skeleton className="w-full h-2 mb-1.5" />
                <Skeleton className="w-full h-2 mb-1.5" />

                <div className="mb-4 flex space-x-4">
                    <Skeleton className="w-1/12 h-3" />
                    <Skeleton className="w-1/12 h-3" />
                </div>
                <Skeleton className="w-full	 h-10" />
            </div>
</div>
    );
};

export default TicketSkeleton;