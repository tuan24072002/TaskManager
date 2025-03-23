import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import io, { Socket } from 'socket.io-client';
import { FiMessageCircle } from "react-icons/fi";
import { cn } from '@/lib/utils';
import model from '@/lib/gemini';
import { toast } from 'sonner';
import { useAppSelector } from '@/app/hooks';

const ChatApp = () => {
    const { user } = useAppSelector(state => state.app);
    const chatState = useAppSelector(state => state.chat);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatProps[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userList, setUserList] = useState<userProps[]>([]);
    const [typingInfo, setTypingInfo] = useState<TypingInfoProps>({
        isTyping: false,
        sender: null,
        userId: null
    });
    const prePrompt = `
    Bạn là trợ lý thông minh chuyên tư vấn về quản lý công việc cho trang web **TaskMe**.
    Khi trả lời, hãy:
    - Sử dụng tiếng Việt, thân thiện, ngắn gọn (tối đa 150 từ), rõ ràng và không lan man.
    - Không lặp lại hay nhắc lại chỉ dẫn trên trong câu trả lời.
    - Nếu câu hỏi không liên quan đến quản lý công việc, hãy từ chối trả lời trong 1-2 câu ngắn gọn.
    - Chỉ khi người dùng chào hỏi, hãy trả lời bằng "TaskMe xin chào, ..."
    - Khi đề cập đến "TaskMe", hãy in đậm.
    Thông tin về TaskMe:
    - Dashboard: Thống kê công việc theo loại (todo, in progress, completed) bằng dạng số / biểu đồ.
    - Tasks: Hiển thị tất cả công việc theo board view / list view.
    - Completed: Hiển thị các công việc đã hoàn thành theo board view / list view.
    - In Progress: Hiển thị các công việc đang tiến hành theo board view / list view.
    - Todo: Hiển thị các công việc cần làm theo board view / list view.
    `;
    const handleTyping = () => {
        socket?.emit("typing", {
            sender: user.isAdmin ? "support" : "user",
            receiver: chatState.receiver === "model" ? "model" : user.isAdmin ? "user" : "support",
            userId: user.isAdmin ? selectedUserId : user._id
        });
    };

    const handleStopTyping = () => {
        socket?.emit("stopTyping", {
            sender: user.isAdmin ? "support" : "user",
            receiver: chatState.receiver === "model" ? "model" : user.isAdmin ? "user" : "support",
            userId: user.isAdmin ? selectedUserId : user._id
        });
    };
    useEffect(() => {
        const newSocket = io('http://localhost:1234', {
            auth: { user }
        });
        setSocket(newSocket);
        return () => { newSocket.disconnect(); };
    }, [user]);
    useEffect(() => {
        if (!socket) return;
        socket.on("userTyping", (data) => {
            setTypingInfo({
                isTyping: true,
                sender: data.sender,
                userId: data.userId
            });
        });

        socket.on("userStoppedTyping", () => {
            setTypingInfo({
                isTyping: false,
                sender: null,
                userId: null
            });
        });
        return () => {
            socket.off("userTyping");
            socket.off("userStoppedTyping");
        };
    }, [socket])
    useEffect(() => {
        if (!socket) return;

        const handleReceive = (msg: ChatProps) => {
            setMessages(prev => [...prev, msg]);
            if (!isShowMessage) {
                setUnreadCount(prev => prev + 1);
            }
        };

        socket.on("receiveMessage", handleReceive);

        return () => {
            socket.off("receiveMessage", handleReceive);
        };
    }, [socket, isShowMessage]);

    useEffect(() => {
        if (!socket) return;

        socket.on("userList", (users: userProps[]) => {
            setUserList(users);
        });

        if (user.isAdmin && chatState.receiver === "support" && messages) {
            socket.emit("getUserList");
        }

        return () => {
            socket.off("userList");
        };
    }, [socket, user.isAdmin, chatState.receiver, messages]);

    const sendMessage = async () => {
        if (message.trim()) {
            try {
                let receiver: "model" | "user" | "support";
                let socketRoom: string;

                if (user.isAdmin) {
                    if (chatState.receiver === "model") {
                        receiver = "model";
                        socketRoom = "ModelRoom";
                    } else {
                        if (!selectedUserId) {
                            toast.error("Vui lòng chọn người dùng để gửi tin nhắn!");
                            return;
                        }
                        receiver = "user";
                        socketRoom = "AdminRoom";
                    }
                } else {
                    receiver = chatState.receiver;
                    socketRoom = receiver === "support" ? "AdminRoom" : "ModelRoom";
                }

                const userMsg: ChatProps = {
                    time: new Date().toLocaleTimeString(),
                    text: message,
                    sender: user.isAdmin ? "support" : "user",
                    receiver,
                    socketRoom,
                    userId: user.isAdmin ? selectedUserId! : user._id
                };
                socket?.emit("sendMessage", userMsg);
                setMessage("");

                if (receiver === "model") {
                    try {
                        handleTyping();
                        const result = await model.generateContent(prePrompt + "\n" + message);
                        const aiMsg: ChatProps = {
                            time: new Date().toLocaleTimeString(),
                            text: result.response.candidates?.[0].content.parts[0].text ?? "",
                            sender: "model"
                        };
                        socket?.emit("sendMessage", aiMsg);
                    } catch (error) {
                        console.error(error);
                        toast.dismiss();
                        toast.error("Please try again!");
                    }
                }

                if (receiver === "support" && messages.length === 0 && !user.isAdmin) {
                    const supportMsg: ChatProps = {
                        time: new Date().toLocaleTimeString(),
                        text: "**TaskMe** xin chào, vui lòng đợi trong giây lát, chúng tôi sẽ sớm hỗ trợ bạn.",
                        sender: "support",
                        socketRoom: "AdminRoom"
                    };
                    setTimeout(() => {
                        socket?.emit("sendMessage", supportMsg);
                    }, 100);
                }
                handleStopTyping();
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <div onClick={() => {
                setIsShowMessage(prev => !prev);
                setUnreadCount(0);
            }}
                className={cn(`absolute bottom-4 right-4 transition-all duration-500 bg-white/80 cursor-pointer size-16 rounded-full overflow-hidden border border-black z-10`)}>
                <div className='size-full flex items-center justify-center relative group'>
                    <FiMessageCircle className={cn("size-9 group-hover:rotate-60 transition-all duration-300", isShowMessage && '-rotate-180')} />
                    {unreadCount > 0 && (
                        <div className='size-4 bg-red-500 rounded-full absolute right-2 top-2 z-10 flex items-center justify-center text-white text-xs animate-bounce'>
                            {unreadCount}
                        </div>
                    )}
                </div>
            </div>
            <ChatBox
                isShowMessage={isShowMessage}
                setIsShowMessage={setIsShowMessage}
                messages={messages}
                setMessages={setMessages}
                sendMessage={sendMessage}
                message={message}
                setMessage={setMessage}
                userList={userList}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                typingInfo={typingInfo}
                handleTyping={handleTyping}
                handleStopTyping={handleStopTyping}
            />
        </>
    );
};

export default ChatApp;
