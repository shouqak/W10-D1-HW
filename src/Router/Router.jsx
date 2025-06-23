import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Signup from "../Pages/Signup"
import HomePage from "../Pages/Home"
import Signin from "../Pages/Signin"
import Landing from "../Pages/Landing"



function Layout() {
  return (
    <>

      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Landing/>},
{ path: "/auth/signup", element: <Signin/> },
{ path: "/home/:token", element: <HomePage/> },
{ path: "/auth/signin",element: <Signup/> },

    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router