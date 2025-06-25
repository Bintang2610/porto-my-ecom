import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import Search from './pages/Search.jsx';
import CategoryAll from './pages/CategoryAll.jsx';
import Category from './pages/Category.jsx';
import Assistant from './pages/Assistant.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/product/:id', element: <DetailProduct /> },
  { path: '/search', element: <Search />},
  { path: '/category/all', element: <CategoryAll /> },
  { path: '/category/:t', element: <Category /> },
  { path: '/assistant', element: <Assistant />},
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
