"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "./AgGridDataTable.css";

import {
  ClientSideRowModelModule,
  ModuleRegistry,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  QuickFilterModule, // ✅ must be registered
} from "ag-grid-community";

// ✅ Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  QuickFilterModule,
]);

const AgGridDataTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState([
    { field: "make", minWidth: 170 },
    { field: "model" },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    filter: false,
  }), []);

  const data = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];

  // Store Grid API
  const gridApi = useRef(null);

  const onGridReady = useCallback((params) => {
    gridApi.current = params.api;

    // Debug logs
    console.log("Row Model Type:", params.api.getRowModel()?.getType?.());
    console.log("Quick filter supported:", typeof params.api.setGridOption === "function");
  }, []);

  // ✅ Set quick filter using new method
  const onQuickFilterChange = useCallback((e) => {
    if (gridApi.current) {
      gridApi.current.setGridOption("quickFilterText", e.target.value);
    }
  }, []);

  return (
    <div style={{ height: "calc(100vh - 300px)", width: "100%" }}>
      <input
        type="text"
        placeholder="Search all columns..."
        onChange={onQuickFilterChange}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "300px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            onGridReady={onGridReady}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            rowModelType="clientSide" // ✅ Important for Quick Filter
          />
        </div>
      </div>
    </div>
  );
};

export default AgGridDataTable;
