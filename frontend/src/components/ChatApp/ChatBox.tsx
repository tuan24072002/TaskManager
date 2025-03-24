import Assets from '@/assets';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { FaCaretDown, FaChevronDown, FaRegWindowMaximize, FaRegWindowRestore, FaRobot } from 'react-icons/fa';
import { FaUserLarge } from 'react-icons/fa6';
import { IoMdSend } from 'react-icons/io';
import { FcManager } from "react-icons/fc";
import ReactMarkdown from 'react-markdown';
import ChatDialog from './ChatDialog';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Tooltip } from "react-tooltip";
import { setMode } from '@/slices/chat.slice';

const ChatBox = ({
    isShowMessage,
    setIsShowMessage,
    messages,
    setMessages,
    sendMessage,
    setMessage,
    message,
    userList,
    selectedUserId,
    setSelectedUserId,
    typingInfo,
    handleTyping,
    handleStopTyping,
}: {
    isShowMessage: boolean;
    setIsShowMessage: (e: boolean) => void;
    messages: ChatProps[];
    setMessages: (e: ChatProps[]) => void;
    sendMessage: VoidFunction;
    setMessage: (e: string) => void;
    message: string;
    userList: any[];
    selectedUserId: string | null;
    setSelectedUserId: (e: string | null) => void;
    typingInfo: TypingInfoProps
    handleTyping: VoidFunction
    handleStopTyping: VoidFunction
}) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.app);
    const chatState = useAppSelector(state => state.chat);
    const containerRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<any>(null);
    const onMessageChange = (e: any) => {
        setMessage(e.target.value);
        if (chatState.receiver !== "model") handleTyping();
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            handleStopTyping();
        }, 2000);
    };
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, []);
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages, chatState.mode]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (chatState.mode === "big" && e.key === "Escape") {
                dispatch(setMode("small"));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [chatState.mode, dispatch]);
    const showModelPrompt =
        chatState.receiver === "model" &&
        (messages.length === 0 ||
            !messages.some(
                (msg) =>
                    msg.sender === "model" ||
                    (msg.receiver === "model" && msg.sender === "support")
            ));

    const showSupportPrompt =
        chatState.receiver === "support" &&
        (messages.length === 0 ||
            !messages.some(
                (msg) =>
                    (msg.sender === "user" && msg.receiver === "support") ||
                    (msg.receiver === "user" && msg.sender === "support")
            ));

    return (
        <div
            className={cn(
                "border border-black/10 overflow-hidden rounded-lg bg-white z-10 fixed top-0 left-0 transition-all duration-500 ease-in-out",
                chatState.mode === "big" && isShowMessage
                    ? "w-screen h-screen translate-x-0 translate-y-0"
                    : chatState.mode === "small" && isShowMessage
                        ? "w-[400px] h-[500px] translate-x-[calc(100vw-400px-1rem)] translate-y-[calc(100vh-500px-6rem)]"
                        : chatState.mode === "small" && !isShowMessage
                            ? "w-[400px] h-[500px] translate-x-[calc(100vw-400px-1rem+416px)] translate-y-[calc(100vh-500px-6rem)]"
                            : "w-screen h-screen translate-x-[calc(100vw+100vw)] translate-y-0"
            )}
        >
            <div className="size-full flex flex-col">
                <div className="w-full h-16 flex items-center justify-between px-6">
                    <div className="size-10 rounded-full border relative">
                        <img src={Assets.Images.logo} alt="Avatar" className="size-full object-contain" />
                    </div>
                    <p className="uppercase flex-1 text-left pl-4 text-lg font-bold">TASK ME</p>
                    <div className='flex items-center gap-4'>
                        <div className="size-8 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 flex items-center justify-center" onClick={() => setIsShowMessage(false)}>
                            <FaCaretDown className="text-black/50" />
                        </div>
                        <div className="size-8 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 flex items-center justify-center" onClick={() => dispatch(setMode(chatState.mode === "big" ? "small" : "big"))}>
                            {
                                chatState.mode === "small" ?
                                    <FaRegWindowMaximize /> :
                                    <FaRegWindowRestore />
                            }
                        </div>
                        <div className="size-8 rounded-full bg-slate-200 cursor-pointer hover:bg-slate-300 flex items-center justify-center">
                            <ChatDialog setMessages={setMessages} />
                        </div>
                    </div>
                </div>
                {user.isAdmin && chatState.receiver === "support" && (
                    <div className="p-2 shadow relative">
                        <select
                            value={selectedUserId || ""}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="w-full p-2 border rounded appearance-none text-sm focus:outline-none"
                        >
                            <option value="">Chọn người dùng</option>
                            {userList.map((usr) => (
                                <option key={usr._id} value={usr._id} className={cn("text-sm", usr?.unreadCount > 0 ? "text-red-600 font-bold" : "text-black")}>
                                    {usr.name} {usr?.unreadCount > 0 && usr.unreadCount}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                            <FaChevronDown className="text-gray-600 text-sm" />
                        </div>
                    </div>
                )}
                <div className="flex-1 w-full border-t border-b border-black/10 pt-2 overflow-x-hidden overflow-y-auto" ref={containerRef}>
                    {(showModelPrompt || showSupportPrompt) && (
                        <p className="text-sm max-w-[90%] leading-6 text-center pt-10 mx-auto select-none">
                            {chatState.receiver === "model" ? (
                                <>
                                    Bắt đầu trò chuyện nhanh với{" "}
                                    <span className="highlight bg-clip-text text-transparent font-black">
                                        AI của TaskMe
                                    </span>
                                    . <br />
                                    Thông tin của bạn được ẩn và tin nhắn trò chuyện chỉ lưu trên trình duyệt web.
                                </>
                            ) : (
                                <>
                                    Bắt đầu trò chuyện nhanh với{" "}
                                    <span className="highlight bg-clip-text text-transparent font-black">
                                        nhân viên chăm sóc
                                    </span>
                                    . <br />
                                    Thông tin của bạn được ẩn và tin nhắn trò chuyện chỉ lưu trên trình duyệt web.
                                </>
                            )}
                        </p>
                    )}
                    {messages.map((msg, index: number) => {
                        if (user.isAdmin && chatState.receiver === "support" && msg.userId !== selectedUserId) {
                            return null;
                        }

                        if (user.isAdmin) {
                            if (chatState.receiver === "support") {
                                if (
                                    !((msg.sender === "user" && msg.receiver === "support") ||
                                        (msg.sender === "support" && msg.receiver === "user"))
                                ) {
                                    return null;
                                }
                                if (msg.sender === "user") {
                                    return (
                                        <div key={index} className={cn("p-2 flex flex-col gap-2", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                            <div className="flex items-center gap-3 w-full">
                                                <div data-tooltip-id={"user"} className='size-10 bg-black text-white rounded-full border flex items-center justify-center'>
                                                    <FaUserLarge />
                                                </div>
                                                <div className='h-full w-full flex-1 box-shadow-custom bg-white overflow-x-hidden overflow-y-auto text-black py-2 px-4 rounded-md'>
                                                    <p className="w-full break-words whitespace-pre-wrap text-left" style={{ wordBreak: "break-word" }}>
                                                        {msg.text}
                                                    </p>
                                                </div>
                                            </div>
                                            <Tooltip id={"user"} place="bottom-start" variant="dark" content={"User"} />
                                            <p className='text-xs font-semibold ml-auto'>{msg.time}</p>
                                        </div>
                                    );
                                } else if (msg.sender === "support") {
                                    return (
                                        <div key={index} className={cn("p-2 grid grid-flow-row-dense gap-2 ml-auto", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                            <div className="flex items-center gap-3">
                                                <div className='size-full flex flex-col items-end box-shadow-custom overflow-x-hidden overflow-y-visible text-black text-left py-2 px-4 rounded-md'>
                                                    <p className="w-full break-words whitespace-pre-wrap text-right" style={{ wordBreak: "break-word" }}>
                                                        {msg.text}
                                                    </p>
                                                </div>
                                                <div data-tooltip-id={"support"} className='size-10 bg-gray-100 rounded-full border flex items-center justify-center'>
                                                    <FcManager className='text-2xl' />
                                                </div>
                                            </div>
                                            <Tooltip id={"support"} place="bottom-start" variant="dark" content={"Support"} />
                                            <p className='text-xs font-semibold'>{msg.time}</p>
                                        </div>
                                    );
                                }
                            } else if (chatState.receiver === "model") {
                                if (
                                    !((msg.sender === "support" && msg.receiver === "model") ||
                                        (msg.sender === "model"))
                                ) {
                                    return null;
                                }
                                if (msg.sender === "support") {
                                    return (
                                        <div key={index} className={cn("p-2 flex flex-col gap-2", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                            <div className="flex items-center gap-3 w-full">
                                                <div data-tooltip-id={"support"} className='size-10 bg-gray-100 rounded-full border flex items-center justify-center'>
                                                    <FcManager className='text-2xl' />
                                                </div>
                                                <div className='h-full w-full flex-1 box-shadow-custom bg-white overflow-x-hidden overflow-y-auto text-black py-2 px-4 rounded-md'>
                                                    <p className="w-full break-words whitespace-pre-wrap text-left" style={{ wordBreak: "break-word" }}>
                                                        {msg.text}
                                                    </p>
                                                </div>
                                            </div>
                                            <Tooltip id={"support"} place="bottom-start" variant="dark" content={"Supporter"} />
                                            <p className='text-xs font-semibold ml-auto'>{msg.time}</p>
                                        </div>
                                    );
                                } else if (msg.sender === "model") {
                                    return (
                                        <div key={index} className={cn("p-2 grid grid-flow-row-dense gap-2 ml-auto", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                            <div className="flex items-center gap-3">
                                                <div className='size-full flex flex-col items-end box-shadow-custom overflow-x-hidden overflow-y-visible text-black text-left py-2 px-4 rounded-md'>
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                </div>
                                                <div data-tooltip-id={"ai"} className='size-10 bg-gray-100 rounded-full border flex items-center justify-center'>
                                                    <FaRobot className='text-2xl' />
                                                </div>
                                            </div>
                                            <Tooltip id={"ai"} place="bottom-start" variant="dark" content={"AI"} />
                                            <p className='text-xs font-semibold'>{msg.time}</p>
                                        </div>
                                    );
                                }
                            }
                        } else {
                            if (msg.sender === "user") {
                                return (
                                    <div key={index} className={cn("p-2 flex flex-col gap-2", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                        <div className="flex items-center gap-3 w-full">
                                            <div data-tooltip-id={"user"} className='size-10 bg-black text-white rounded-full border flex items-center justify-center'>
                                                <FaUserLarge />
                                            </div>
                                            <div className='h-full w-full flex-1 box-shadow-custom bg-white overflow-x-hidden overflow-y-auto text-black py-2 px-4 rounded-md'>
                                                <p className="w-full break-words whitespace-pre-wrap text-left" style={{ wordBreak: "break-word" }}>
                                                    {msg.text}
                                                </p>
                                            </div>
                                        </div>
                                        <Tooltip id={"user"} place="bottom-start" variant="dark" content={"You"} />
                                        <p className='text-xs font-semibold ml-auto'>{msg.time}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className={cn("p-2 grid grid-flow-row-dense gap-2 ml-auto", chatState.mode === "big" ? "w-1/2" : "w-[80%]")}>
                                        <div className="flex items-center gap-3">
                                            <div className='size-full flex flex-col items-end box-shadow-custom overflow-x-hidden overflow-y-visible text-black text-left py-2 px-4 rounded-md'>
                                                {
                                                    msg.sender === "support" &&
                                                    <p className="w-full break-words whitespace-pre-wrap text-right" style={{ wordBreak: "break-word" }}>
                                                        {msg.text}
                                                    </p>
                                                }
                                                {
                                                    msg.sender === "model" &&
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                }
                                            </div>
                                            <div data-tooltip-id={"model"} className='size-10 bg-gray-100 rounded-full border flex items-center justify-center'>
                                                {
                                                    msg.sender === "support" ?
                                                        <FcManager className='text-2xl' /> :
                                                        <FaRobot className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                        <Tooltip id={"model"} place="bottom-start" variant="dark" content={msg.sender === "support" ? "Support" : "AI"} />
                                        <p className='text-xs font-semibold'>{msg.time}</p>
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                    <div className="h-4 pb-2 px-4">
                        {typingInfo.isTyping && (
                            (!user.isAdmin ||
                                (user.isAdmin &&
                                    ((chatState.receiver === "support" && typingInfo.userId === selectedUserId) ||
                                        chatState.receiver === "model")
                                )
                            ) &&
                            <div className='text-left text-sm italic text-blue-600 flex items-center gap-2'>
                                <p>
                                    {
                                        typingInfo.sender === "user" ? "Người dùng đang nhập" :
                                            typingInfo.sender === "support" ? "Nhân viên hỗ trợ đang nhập" :
                                                typingInfo.sender === "model" && "AI đang nhập"
                                    }
                                </p>
                                <div className="w-fit">
                                    <div className="dots-container">
                                        <div className="dot !size-2" />
                                        <div className="dot !size-2" />
                                        <div className="dot !size-2" />
                                        <div className="dot !size-2" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full h-16 flex items-center justify-between px-6 relative">
                    <input
                        type="text"
                        name="chat"
                        id="chat"
                        className="text-sm outline-none border-none bg-transparent flex-1 select-none"
                        placeholder="Nhập tin nhắn, nhấn enter để gửi..."
                        maxLength={150}
                        value={message}
                        onChange={onMessageChange}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="size-10 rounded-full highlight cursor-pointer flex items-center justify-center" disabled={typingInfo.isTyping} onClick={sendMessage}>
                        <IoMdSend className="text-white text-xl" />
                    </button>
                    <p className='absolute bottom-0 left-6 text-sm text-gray-400'>{message.length} / 150</p>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
