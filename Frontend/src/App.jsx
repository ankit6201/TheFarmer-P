import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/PrivateRoute';
import Fields from './pages/Fields';
import './App.css'
import Crops from './pages/Crops';


const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<h1 style={{color:"black"}}> This is A Home Page</h1>}></Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={
          <PrivateRoute>
          <Dashboard/>
          </PrivateRoute>
          }/>
          <Route path='/fields' element={<PrivateRoute>
            <Fields/>
          </PrivateRoute>}/>
          <Route path='/crops' element={<PrivateRoute>
            <Crops/>
          </PrivateRoute>}/>
      </Routes>
      
      <ToastContainer 
    position="bottom-center"
    toastClassName="custom-toast"
/>

    </div>
    </BrowserRouter>
  )
}

export default App
