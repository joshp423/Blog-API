import App from './App';
import Homepage from './components/Homepage/homepage';
import Signup from './components/Signup/signUp';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'sign-up', element: <Signup /> },
    ],
  },
];

export default routes;
