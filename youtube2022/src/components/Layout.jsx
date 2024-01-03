// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import ReportHeadData from '../pages/ReportHeadData';
import Report from '../pages/Report';
import MiniDrawer from './Drawer';
import Register from '../pages/Register';

const Layout = () => {
  return (
    <MiniDrawer>
      {/* Тут могут быть другие компоненты, которые должны отображаться на всех страницах, например Navbar */}
      <Outlet /> {/* Это место, где будет отображаться содержимое текущего маршрута */}
    </MiniDrawer>
  );
};

export default Layout;
