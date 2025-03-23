import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import MobileSidebar from "./components/Sidebar/MobileSidebar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ChatApp from "./components/ChatApp/ChatApp";

type Props = {
    title?: string,
    children: JSX.Element
}
export function Layout(props: Props) {
    const appState = useAppSelector(state => state.app);
    const location = useLocation();

    return appState.logined ?
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <Helmet>
                <title>{props.title ? `${props.title} | TaskMe` : "TaskMe"} </title>
                <meta
                    name="description"
                    content="TaskMe giúp bạn quản lý công việc một cách gọn gàng và tối ưu, phân chia nhiệm vụ hiệu quả để nâng cao năng suất làm việc."
                />
                <meta
                    name="keywords"
                    content="Quản lý công việc, Phân chia công việc, TaskMe, Nâng cao năng suất, Task management, Productivity"
                />
                <meta name="author" content="TaskMe Team" />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={`${props.title} | TaskMe`} />
                <meta
                    property="og:description"
                    content="TaskMe giúp bạn quản lý công việc một cách gọn gàng và tối ưu, phân chia nhiệm vụ hiệu quả để nâng cao năng suất làm việc."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta property="og:image" content="https://yourdomain.com/path-to-image.jpg" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${props.title} | TaskMe`} />
                <meta
                    name="twitter:description"
                    content="TaskMe giúp bạn quản lý công việc một cách gọn gàng và tối ưu, phân chia nhiệm vụ hiệu quả để nâng cao năng suất làm việc."
                />
                <meta name="twitter:image" content="https://yourdomain.com/path-to-image.jpg" />
            </Helmet>
            <div className="lg:w-1/5 h-full bg-white sticky top-0 hidden lg:block">
                <Sidebar />
            </div>
            <MobileSidebar />
            <main className="flex-1 h-full overflow-hidden flex flex-col">
                <Navbar />
                <div className='size-full flex-1 p-4 overflow-hidden relative'>
                    <div className="h-[calc(100vh-112px)] rounded-md relative overflow-x-hidden overflow-y-auto">
                        {props.children}
                        <motion.div
                            key={location.key}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="fixed text-xs text-gray-400 bottom-0 right-6">
                            Copy&#9400;2025 - Tran Le Anh Tuan
                        </motion.div>
                    </div>
                    {
                        props.title !== "Support" &&
                        <ChatApp />
                    }
                </div>
            </main>
        </div>
        :
        <Navigate to={'/login'} state={{ from: location }} replace />
}