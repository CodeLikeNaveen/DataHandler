import { Header } from "./components"
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className='w-screen h-screen'>
        <Header />
          <main>
            <Outlet />
          </main>
    </div>
  )
}

export default App
