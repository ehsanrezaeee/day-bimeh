import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {HeroUIProvider} from "@heroui/react"
import './index.css'
import App from './App.tsx'
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <App/>
            </HeroUIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>,
)
