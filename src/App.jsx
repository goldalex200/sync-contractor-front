import { useState } from 'react'
import './App.css'
import { Header } from './cmps/Header.jsx'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Permissions } from "./pages/Permissions";
import { ManagementPage } from "./pages/ManagementPage.jsx";
import { Dashboard } from './pages/Dashboard.jsx';
import { ShowWork } from './pages/ShowWork.jsx';
import {Register} from "./pages/Register.jsx";
import {CostsChartPage} from "./cmps/Dashboard/CostsChartPage.jsx";
import {TimeStatusChartPage} from "./cmps/Dashboard/TimeStatusChartPage.jsx";
import {FacilityFaultsChartPage} from "./cmps/Dashboard/FacilityFaultsChartPage.jsx";
import {WorkStatusChartPage} from "./cmps/Dashboard/WorkStatusChartPage.jsx";
import {ContractorsChartPage} from "./cmps/Dashboard/ContractorsChartPage.jsx";
import {ContractorsChartWorstPage} from "./cmps/Dashboard/ContractorsChartWorstPage.jsx";

function App() {
  const location = useLocation();
  return (
    <>

      {/*{location.pathname !== '/sync-contractor/login' && <Header />}*/}
      <Header/>
      <Routes>
        <Route path='/sync-contractor' element={<Home />} />
        <Route path='/sync-contractor/managementTable' element={<ManagementPage />} />
        <Route path='/sync-contractor/login' element={<Login />} />
        <Route path='/sync-contractor/register' element={<Register />} />
        {/*<Route path='/sync-contractor/permissions' element={<Permissions />} />*/}
        {/*<Route path='/sync-contractor/showWork' element={<ShowWork />} />*/}
        {/*<Route path='/sync-contractor/dashboard' element={<Dashboard />} />*/}
        <Route path='/sync-contractor/cost-chart' element={<CostsChartPage/>} />
        <Route path='/sync-contractor/facility-chart' element={<FacilityFaultsChartPage/>} />
        <Route path='/sync-contractor/time-chart' element={<TimeStatusChartPage/>} />
        <Route path='/sync-contractor/work-status-chart' element={<WorkStatusChartPage/>} />
        <Route path='/sync-contractor/top-contractor-chart' element={<ContractorsChartPage/>} />
        <Route path='/sync-contractor/top-minus-contractor-chart' element={<ContractorsChartWorstPage/>} />

        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
