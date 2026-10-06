import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import EditarProduto from './routes/EditarProduto/EditarProduto.tsx'
import Erro from './routes/Error/Erro.tsx'
import Home from './routes/Home/Home.tsx'
import Produto from './routes/Produto/Index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Erro />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/produtos',
        element: <Produto />,
      },
      {
        path: '/editar-produtos/:id',
        element: <EditarProduto />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
