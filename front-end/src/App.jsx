import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }, {
    path: '/register',
    element: <Register />
  }, {
    path: '/login',
    element: <Login />
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App
