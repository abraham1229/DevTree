import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router.tsx'
import { LoaderProvider } from './contexts/LoaderContext'
import Loader from './components/Loader'

 const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <Router />
        <Loader />
        <ReactQueryDevtools />
      </LoaderProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
