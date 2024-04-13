import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'

function App() {

  return (
    <>
      <div className='flex justify-center place-items-center h-[100vh] w-[100vw]'>
        <div className=''>
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
