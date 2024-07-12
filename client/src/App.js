import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                <Route 
                path='/dashboard'
                element={
                  <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>} 
              />

              <Route path="dashboard/createEmploye" element={<CreateEmployee/>}></Route>
              <Route path="dashboard/listEmploye" element={<EmployeeList/>}></Route>
              <Route path="dashboard/updateEmploye/:id" element={<EmployeeEdit/>}></Route>
             
             
              

                
                
            </Routes>
        </Router>
    );
};

export default App;
