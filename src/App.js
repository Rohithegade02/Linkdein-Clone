import { useEffect } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { getUserAuth } from './actions';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import {connect}from 'react-redux'
function App(props) {


  useEffect(()=>{
    props.getUserAuth();
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} exact />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return{};
}
const mapDispatchToProps = (dispatch)=>({
  getUserAuth:()=>dispatch(getUserAuth())
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
