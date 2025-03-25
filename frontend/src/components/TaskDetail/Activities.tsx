import { act_types } from "@/utils/utils"
import { useState } from "react"
import CardActivity from "./CardActivity";
import Loader from "../Loader";
import Button from "../Button";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Activities = ({ activity, id }: { activity: activitiesProps[], id: string }) => {
    const [selected, setSelected] = useState<string[] | string>(act_types);
    const [text, setText] = useState("");
    const [isAddActivity, setIsAddActivity] = useState(false);
    const isLoading = false;
    const handleSubmit = async () => {
        console.log(id);
    };
    return (
        <>
            <button
                onClick={() => setIsAddActivity(prev => !prev)}
                className="absolute top-[1px] right-2 bg-blue-600 text-white rounded-md p-2 flex items-center gap-2 text-sm">
                <FaPlus />
                <span>Add Activity</span>
            </button>
            <div className={cn(
                "h-[676px] w-full flex gap-4 transition-all duration-500"
            )}>
                <div className={cn(
                    "flex-1 max-h-[calc(100vh-206px)] bg-white rounded-md shadow px-10 py-8 overflow-y-auto overflow-x-hidden")}>
                    <div className="w-full">
                        {
                            activity.map((act, index) => {
                                return (
                                    <CardActivity
                                        key={`Activity map: ${index}`}
                                        item={act}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={cn(
                    "bg-white rounded-md shadow transition-all duration-500",
                    isAddActivity ? "w-1/3 px-10 py-8" : "w-0 p-0"
                )}>
                    <h4 className='text-gray-600 text-lg font-semibold mb-5'>
                        Add Activity
                    </h4>
                    <div className='flex flex-wrap w-full gap-5'>
                        {act_types.map((item, index) => (
                            <div key={`Activity type map: ${index}`} className='flex gap-2 items-center'>
                                <input
                                    type='checkbox'
                                    className='h-4 w-4'
                                    checked={selected === item ? true : false}
                                    onChange={() => setSelected(item)}
                                />
                                <p>{item}</p>
                            </div>
                        ))}
                        <textarea
                            rows={10}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder='Type ......'
                            className='bg-white border border-gray-300 p-4 rounded-md w-full focus:ring-2 mt-10 outline-none resize-none ring-blue-500'
                        ></textarea>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Button
                                type='button'
                                label='Submit'
                                onClick={handleSubmit}
                                className='bg-blue-600 rounded text-white'
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Activities