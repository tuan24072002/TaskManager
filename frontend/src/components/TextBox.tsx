import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa";
type TextBoxProps = {
    type?: string,
    placeholder?: string,
    label?: string,
    className?: string,
    register: UseFormRegisterReturn,
    name?: string,
    error?: string,
    required?: boolean,
    disabled?: boolean
}
const TextBox = React.forwardRef<HTMLDivElement, TextBoxProps>(({
    type,
    placeholder,
    label,
    className,
    register,
    name,
    error,
    required,
    disabled
}, ref) => {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="flex flex-col w-full gap-1" ref={ref}>
            {label &&
                <>
                    <label htmlFor={name} className="flex text-slate-800 gap-2 items-center">
                        {required && <span className="text-base text-red-500">*</span>}
                        {label}
                    </label>
                </>
            }
            <div className="relative">
                <input
                    type={showPass ? 'text' : type}
                    id={name}
                    disabled={disabled}
                    {...register}
                    placeholder={error ? error : (type === 'password' ? '••••••' : placeholder)}
                    aria-invalid={error ? true : false}
                    className={cn("bg-transparent px-2 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none focus:ring-2 ring-blue-300 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed",
                        `${error ? 'placeholder-red-500 font-semibold' : ''}`,
                        className)}
                />
                {
                    type === 'password' &&
                    <div className="-translate-y-1/2 absolute cursor-pointer right-4 top-1/2" onClick={() => setShowPass(prev => !prev)}>
                        {
                            showPass ?
                                <FaEyeSlash size={20} className="text-highlight" /> :
                                <FaEye size={20} className="text-highlight" />
                        }
                    </div>
                }
            </div>
        </div>
    )
})

export default TextBox