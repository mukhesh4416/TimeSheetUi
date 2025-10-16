"use client";

import React, { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "./AgGridDataTable.scss";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import {
  ClientSideRowModelModule,
  ModuleRegistry,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  QuickFilterModule,
} from "ag-grid-community";

// ✅ Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  QuickFilterModule,
]);

const AgGridDataTable = ({dtOptions,data = [],filterInput=""}) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    filter: false,
  }), []);


  // Store Grid API
  const gridApi = useRef(null);

  const onGridReady = useCallback((params) => {
    gridApi.current = params.api;
  }, []);

  // ✅ Set quick filter using new method
  const onQuickFilterChange = useCallback((e) => {
    if (gridApi.current) {
      // gridApi.current.setGridOption("quickFilterText", e.target.value);
    }
  }, []);

  useEffect(()=>{
     if (gridApi.current) {
      gridApi.current.setGridOption("quickFilterText", filterInput);
    }
  },[filterInput])

  return (
    <div style={{ height: "calc(100vh - 150px)", width: "100%" }}>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            onGridReady={onGridReady}
            rowData={data}
            columnDefs={dtOptions?.columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            rowModelType="clientSide"
            headerHeight={40} 
            rowHeight={35}  
          />
        </div>
      </div>
    </div>
  );
};

export default AgGridDataTable;
