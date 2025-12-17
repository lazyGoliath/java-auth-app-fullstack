import './App.css'
import { Button } from './components/ui/button'
import { Calendar } from './components/ui/calendar'

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello, Auth App Frontend</h1>
      <Button variant={'outline'}>Click Me</Button>
      <Calendar />
    </div>
  )
}

export default App
