import React from 'react'
import "./App.css"
import { HashRouter } from "react-router-dom";
import RoutesConfig from "./RouterConfig";



function App() {
  return (
      <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <RoutesConfig />
        </React.Suspense>
      </HashRouter>
  );
}

export default App
