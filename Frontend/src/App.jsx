import {BrouserRouter,Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <BrouserRouter>
    <div>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
    </BrouserRouter>
  )
}

export default App
