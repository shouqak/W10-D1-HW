import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import HomePage from "../Pages/Home"
import Signin from "../Pages/Signin"
import Signup from "../Pages/Signup"
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
    children: [
      { path: "/", element: <Landing /> },
      { path: "/auth/signup", element: <Signup /> },
      { path: "/home/:token", element: <HomePage /> },
      { path: "/auth/signin", element: <Signin /> },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
