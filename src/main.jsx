import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import Search from './pages/Search.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/product/:id', element: <DetailProduct /> },
  { path: '/search', element: <Search />},
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
