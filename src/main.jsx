import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import Search from './pages/Search.jsx';
import CategoryAll from './pages/CategoryAll.jsx';
import Category from './pages/Category.jsx';
import Assistant from './pages/Assistant.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Cart from './pages/Cart.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/product/:id', element: <DetailProduct /> },
  { path: '/search', element: <Search />},
  { path: '/category/all', element: <CategoryAll /> },
  { path: '/category/:t', element: <Category /> },
  { path: '/assistant', element: <Assistant />},
  { path: '/wishlist', element: <Wishlist />},
  { path: '/cart', element: <Cart /> },
  { path: '*', element: <NotFoundPage /> },
],
  {
    basename: "/packify",
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
