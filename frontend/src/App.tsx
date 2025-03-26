import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Layout } from './Layout'
import { HttpService } from './services/http/HttpService'
import { useAppSelector } from './app/hooks'
import { SocketProvider } from './context/SocketContext'

const Login = React.lazy(() => import("@/pages/Login"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Tasks = React.lazy(() => import("@/pages/Tasks"));
const TaskDetails = React.lazy(() => import("@/pages/TaskDetails"));
const Users = React.lazy(() => import("@/pages/Users"));
const Trash = React.lazy(() => import("@/pages/Trash"));
const pageList = [
  {
    path: "/",
    element: <Layout title='Dashboard' children={<Dashboard />} />,
    isPublic: false
  },
  {
    path: "/tasks",
    element: <Layout title='Tasks' children={<Tasks />} />,
    isPublic: false
  },
  {
    path: "/completed/:status",
    element: <Layout title='Tasks Completed' children={<Tasks />} />,
    isPublic: false
  },
  {
    path: "/in-progress/:status",
    element: <Layout title='Tasks In-Progress' children={<Tasks />} />,
    isPublic: false
  },
  {
    path: "/todo/:status",
    element: <Layout title='Tasks Todo' children={<Tasks />} />,
    isPublic: false
  },
  {
    path: "/task/:id",
    element: <Layout title='Task Details' children={<TaskDetails />} />,
    isPublic: false
  },
  {
    path: "/team",
    element: <Layout title='Team' children={<Users />} />,
    isPublic: false
  },
  {
    path: "/trashed",
    element: <Layout title='Trashed' children={<Trash />} />,
    isPublic: false
  },
  //Public page
  {
    path: "/login",
    element: <Suspense fallback={<></>}><Login /></Suspense>,
    isPublic: true
  },
  {
    path: "/*",
    element: <Suspense fallback={<></>}><Layout children={<Dashboard />} /></Suspense>,
    isPublic: true
  },
]

function App() {
  const { user } = useAppSelector(state => state.app);
  HttpService.initialize();
  return (
    <SocketProvider user={user}>
      <BrowserRouter>
        <main className="w-full h-screen overflow-hidden bg-background">
          <Routes>
            {
              pageList.map((page) => (
                <Route key={page.path} path={page.path} element={page.element} />
              ))
            }
          </Routes>
        </main>
        <Toaster richColors />
      </BrowserRouter>
    </SocketProvider>
  )
}

export default App
