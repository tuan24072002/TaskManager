import { cn } from "@/lib/utils"
import { TASKTYPEICON } from "@/utils/constant"
import moment from "moment"

const CardActivity = ({ item, isConnected }: { item: activitiesProps, isConnected: boolean }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="size-10 flex items-center justify-center">
          {TASKTYPEICON[item.type as keyof typeof TASKTYPEICON]}
        </div>
        <div className="w-full flex items-center">
          <div className="w-0.5 bg-gray-300 h-full" />
        </div>
      </div>
      <div className="flex flex-col gap-y-1 mb-8">
        <div className="flex items-center gap-4">
          <p>{item.by?.name}</p>
          <p className="flex items-center gap-2">
            <span className={cn("size-3 rounded-full", isConnected ? "bg-green-500" : "bg-yellow-500")} />
            {isConnected ? "Connected" : "Connecting"}
          </p>
        </div>
        <div className="text-gray-500 flex items-center gap-1">
          <span className="capitalize">{item.type}</span>
          <span className="text-sm font-bold">({moment(item.date).fromNow()})</span>
        </div>
        <div className="text-gray-700">{item.activity}</div>
      </div>
    </div>
  )
}

export default CardActivity