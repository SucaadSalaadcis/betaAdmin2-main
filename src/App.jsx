 
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard/Dashboard'
import {Home} from './Home/Home'
import {House} from './house/House'
import  ImagesFolder  from './imagesFolder/ImagesFolder'
import  Services  from './Services/services'
import { Clients } from './clients/client'
import { About } from './about/About'
import { Contact } from './contact/Contact'
import  NotFound  from '../NotFound'
 

function App() {
    // console.log(houseType)
  return (
    <>

    <Routes>
      <Route path='/' element={<h1>Login page ...</h1>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='dashboard' element={<Dashboard/>} >
      <Route path='homeSetting' element={<Home/>}/>
      <Route path='gallery' element={<ImagesFolder/>}/>
      {/* <Route path='gallery/:id/:houseType' element={<ImagesFolder/>}/> */}
      <Route path='house' element={<House/>}/>
      <Route path='services' element={<Services/>}/>
      <Route path='client' element={<Clients/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contactForm' element={<Contact/>}/>
     </Route>
    </Routes>
 

    </>
  )
}

export default App
