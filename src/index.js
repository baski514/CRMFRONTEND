import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import Base from './ui_components/Base'
import {useHistory} from "react-router-dom";
import PrivateRoute from './PrivateRoutes';



ReactDOM.render(
  <React.StrictMode>
    <Base history={useHistory} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
