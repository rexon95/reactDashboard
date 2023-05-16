import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/dashboard/Dashboard';
import SignIn from './pages/signin/SignIn';


function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
               <Route path="/dashboard" element={<PrivateRoute/>} >
               <Route path="/dashboard" element={<Dashboard/>} />
               </Route>
            </Routes>
        </Router>
        <ToastContainer/>
        </>
    );
}

export default App;
