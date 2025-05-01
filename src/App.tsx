
import { Outlet } from 'react-router-dom'
import './index.css'
function App() {

  return (
    <div className='bg-red-200'>
      <Outlet />
    </div>
  )
}

export default App
