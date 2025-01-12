import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import App from './App.tsx'
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './react-query/queryClient';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <App/>
            </NextUIProvider>
        </QueryClientProvider>
    </StrictMode>,
)
