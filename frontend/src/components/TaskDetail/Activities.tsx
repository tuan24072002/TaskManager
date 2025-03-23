import { act_types } from "@/utils/utils"
import { useState } from "react"
import CardActivity from "./CardActivity";
import Loader from "../Loader";
import Button from "../Button";

const Activities = ({ activity, id }: { activity: activitiesProps[], id: string }) => {
    const [selected, setSelected] = useState<string[] | string>(act_types);
    const [text, setText] = useState("");
    const isLoading = false;
    const handleSubmit = async () => {
        console.log(id);
    };
    return (
        <div className="flex bg-white h-[676px] justify-between rounded-md shadow w-full 2xl:gap-20 gap-10 px-10 py-8">
            <div className="w-full md:w-1/2">
                <h4 className="text-gray-600 text-lg font-semibold mb-5">Activities</h4>
                <div className="w-full">
                    {
                        activity.map((act, index) => {
                            console.log(index < activity.length - 1);
                            return (
                                <CardActivity
                                    key={`Activity map: ${index}`}
                                    item={act}
                                    isConnected={index < activity.length - 1}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full md:w-1/3">
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
    )
}

export default Activities