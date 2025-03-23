import { cn } from "@/lib/utils"

const Title = ({ title, className }: { title: string, className?: string }) => {
    return (
        <h2 className={cn("text-3xl font-black tracking-widest capitalize highlight bg-clip-text text-transparent", className)}>
            {title}
        </h2>
    )
}

export default Title