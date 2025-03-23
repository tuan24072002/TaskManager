import { cn } from "@/lib/utils";
import { BGS, getInitialsName } from "@/utils/utils";
import moment from "moment";

const UserTable = ({ users }: { users: userProps[] }) => {
    return (
        <div className='bg-white h-fit rounded shadow-md w-full max-h-[523px] md:px-4 md:w-1/3 overflow-auto px-2 py-4'>
            <table className='w-full mb-5 min-w-[400px]'>
                <thead className="bg-white/50 border-b border-gray-300 sticky top-0 z-10">
                    <tr className='bg-clip-text text-left text-transparent font-bold highlight'>
                        <th className='py-2'>Full Name</th>
                        <th className='py-2'>Status</th>
                        <th className='py-2'>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={`Table Users: ${index}`} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
                            <td className='py-2'>
                                <div className='flex gap-3 items-center'>
                                    <div className={cn('w-9 h-9 rounded-full text-white flex items-center justify-center text-sm', BGS[index % users.length])}>
                                        <span className='text-center'>{getInitialsName(user?.name)}</span>
                                    </div>

                                    <div className="flex-1">
                                        <p> {user.name}</p>
                                        <span className='text-black text-xs'>{user?.role}</span>
                                    </div>
                                </div>
                            </td>

                            <td className="py-2">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-center text-sm ${user?.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                        }`}
                                >
                                    {user?.isActive ? "Active" : "Disabled"}
                                </span>
                            </td>
                            <td className='text-sm py-2'>{moment(user?.createdAt).fromNow()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable