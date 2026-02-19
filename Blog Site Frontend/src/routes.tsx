import App from './App';
import Homepage from './components/Homepage/homepage';

const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
    //   { path: 'shop', element: <ShopPage /> },
    //   { path: 'cart', element: <CartPage /> },
    ],
  },
];

export default routes;
