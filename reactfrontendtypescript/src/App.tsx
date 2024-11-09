import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import logo from './logo.svg';
import './App.css';
import NotFound from "./pages/NotFound";
import { PrivateWrapper } from './PrivateRouteUtils/PrivateWrapper';
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import LoginPage from "./pages/LoginPage";
import EmployeeList from "./pages/EmployeeList";
import AccessDenied from "./pages/AccessDenied";
import EmployeeEdit from "./pages/EmployeeEdit";
import Personal from "./pages/Personal";
import PersonalAccount from "./pages/PersonalAccount";
import PersonalHistory from "./pages/PersonalHistory";
import PersonalNotifications from "./pages/PersonalNotifications";
import EmployeePositionList from "./pages/EmployeePositionList";
import EmployeePositionEdit from "./pages/EmployeePositionEdit";
import WorkplaceList from "./pages/WorkplaceList";
import WorkplaceEdit from "./pages/WorkplaceEdit";

function App() {
  return (
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/personal" element={<PrivateWrapper><Personal/></PrivateWrapper>}>
                <Route index  element={<PersonalAccount />} />
                <Route path="account" element={<PersonalAccount/>}/>
                <Route path="history" element={<PersonalHistory/>}/>
                <Route path="notifications" element={<PersonalNotifications/>}/>
            </Route>
            <Route path="/users" element={<PrivateWrapper><UserList/></PrivateWrapper>} />
            <Route path='/users/:id' element={<PrivateWrapper><UserEdit/></PrivateWrapper>}/>
            <Route path="/employees" element={<PrivateWrapper><EmployeeList/></PrivateWrapper>} />
            <Route path="/employees/:id" element={<PrivateWrapper><EmployeeEdit/></PrivateWrapper>} />
            <Route path="/employee_position" element={<PrivateWrapper><EmployeePositionList/></PrivateWrapper>} />
            <Route path="/employee_position/:id" element={<PrivateWrapper><EmployeePositionEdit/></PrivateWrapper>} />
            <Route path="/workplace" element={<PrivateWrapper><WorkplaceList/></PrivateWrapper>} />
            <Route path="/workplace/:id" element={<PrivateWrapper><WorkplaceEdit/></PrivateWrapper>} />
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path='/error' element={<AccessDenied/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
