import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Error from './Components/Error/Error';
import Shop from './Components/Header/Shop/Shop';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import Shipping from './Components/Shipping/Shipping';
import SignUp from './Components/SignUp/SignUp';
import Main from './Layout/Main';
import { productsAndCartLoader } from './Lodears/ProductsAndCartLoder';
import PrivateRoutes from './Routes/PrivateRoutes';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/inventory',
          element: <PrivateRoutes><Inventory></Inventory></PrivateRoutes>
        },
        {
          path: '/shipping',
          element: <PrivateRoutes><Shipping></Shipping></PrivateRoutes>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    { path: '*', element: <Error></Error> }
  ])
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
