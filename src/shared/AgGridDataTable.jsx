"use client";

import React, { useMemo, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AgGridDataTable.css'
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  PaginationModule,
  ValidationModule,
} from "ag-grid-community"; ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const AgGridDataTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "make",
      minWidth: 170,
    },
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const data = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <div style={containerStyle} >
        <div style={gridStyle}>
          <AgGridReact
            rowData={data}
            //   loading={loading}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AgGridDataTable;