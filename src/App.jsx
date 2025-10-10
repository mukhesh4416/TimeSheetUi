import React from 'react'
import { HashRouter } from "react-router-dom";
import RoutesConfig from "./RouterConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <>
      <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RoutesConfig />
        </React.Suspense>
      </HashRouter>
    </>
  );
}

export default App
