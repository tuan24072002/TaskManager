import Assets from "@/assets"

const EmptyList = () => {
    return (
        <div className="size-full flex flex-col gap-6 items-center justify-center bg-white">
            <img src={Assets.Images.emptyBox1} alt="Empty List" />
            <p className="text-gray-400 text-sm">No data available.</p>
        </div>
    )
}

export default EmptyList