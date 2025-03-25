import { TASKTYPEICON } from "@/utils/constant"
import moment from "moment"

const CardActivity = ({ item }: { item: activitiesProps }) => {
  return (
    <div className="flex space-x-4 h-fit">
      <div className="flex gap-4">
        <div className="size-10 flex items-center justify-center">
          {TASKTYPEICON[item.type as keyof typeof TASKTYPEICON]}
        </div>
        <div className="w-full flex items-center">
          <div className="w-[1px] bg-slate-600 h-full" />
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="group inline-flex items-center outline-none">
          <p>{item.by?.name}</p>
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