
import './App.css'
import { RouterService } from './utils/routes/RouterService'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterService />
    </QueryClientProvider>
    )
}

export default App
