import { cn } from "@/lib/utils"
import Loader from "./Loader";

type ButtonProps = {
    icon?: React.ReactNode;
    className?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    loading?: boolean
}
const Button = ({ icon, className, label, type, onClick, loading }: ButtonProps) => {
    return (
        loading ?
            <div className={cn("px-3 py-2 outline-none", className)}>
                <Loader />
            </div> :
            <button
                type={type || "button"}
                className={cn("px-3 py-2 outline-none", className)}
                onClick={onClick}
            >

                <span>{label}</span>
                {icon && icon}
            </button>
    );
};

export default Button;
