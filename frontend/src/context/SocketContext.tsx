import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

interface SocketProviderProps {
    children: React.ReactNode;
    user: any;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, user }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        if (user) {
            const newSocket = io(import.meta.env.VITE_APP_baseApiURL, {
                auth: { user },
            });
            setSocket(newSocket);
            return () => {
                newSocket.disconnect();
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
