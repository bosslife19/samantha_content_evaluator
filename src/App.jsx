import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app my-[20px] sm:my-[100px] max-w-[100%] sm:max-w-[60%] relative left-1 md:left-0 w-[100%] sm:m-auto bg-white rounded-[15px] sm:pt-20 sm:px-12 pb-5'>
     <Header/>
     <Body/> 
    </div>
  )
}

export default App
