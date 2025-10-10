import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const availableProjects = [
  { name: 'ebiz', color: 'success' },

  { name: 'eyard', color: 'primary' },
    { name: 'Haasu', color: 'warning' },
    { name: 'Kitaab', color: 'info' },


];

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const getWeekStart = (offset = 0) => {
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - day + 1 + offset * 7);
  return monday;
};

const formatDate = (date) => {
  const d = new Date(date);
  const dayName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()];
  const month = d.toLocaleString('default', { month: 'short' });
  return `${dayName}, ${month} ${d.getDate()}`;
};

const timeToMinutes = (timeStr) => {
  if (!timeStr || timeStr === '') return 0;
  const parts = timeStr.split(':');
  const h = parseInt(parts[0]) || 0;
  const m = parseInt(parts[1]) || 0;
  const s = parseInt(parts[2]) || 0;
  return h * 60 + m + Math.round(s / 60);
};

const minutesToTime = (mins) => {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}:00`;
};

const FinalSubmission = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [timesheetData, setTimesheetData] = useState({});
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const weekKey = `week_${weekOffset}`;

  useEffect(() => {
    const monday = getWeekStart(weekOffset);
    const newHeaders = Array.from({ length: 7 }).map((_, i) =>
      formatDate(new Date(monday.getTime() + i * 86400000))
    );
    setHeaders(newHeaders);
    setRows(timesheetData[weekKey] || []);
  }, [weekOffset]);

  useEffect(() => {
    if (!timesheetData['week_0']) {
      const sample = [
        {
          project: 'ebiz task-1',
          color: 'success',
          task: 'Design UI',
          estimated: '05:00:00',
          allocated: '04:00:00',
          times: ['00:00:00', '00:09:00', '01:01:54', '', '', '', ''],
        },
        {
          project: 'ebiz task-2',
          color: 'success',
          task: 'Backend API',
          estimated: '08:00:00',
          allocated: '06:00:00',
          times: ['00:01:00', '00:09:00', '', '', '', '', ''],
        },
        {
          project: 'eyard',
          color: 'primary',
          task: 'Testing',
          estimated: '03:00:00',
          allocated: '03:00:00',
          times: ['', '', '', '', '', '', ''],
        },
        {
          project: 'task1',
          color: 'danger',
          task: 'Bug fixing',
          estimated: '04:00:00',
          allocated: '02:30:00',
          times: ['00:08:00', '', '', '', '', '', ''],
        },
      ];
      setTimesheetData((prev) => ({ ...prev, week_0: sample }));
    }
  }, []);

  const updateTime = (value, rowIdx, dayIdx) => {
    const newRows = [...rows];
    newRows[rowIdx].times[dayIdx] = value;
    setRows(newRows);
    setTimesheetData({ ...timesheetData, [weekKey]: newRows });
  };

  const updateField = (field, value, rowIdx) => {
    const newRows = [...rows];
    newRows[rowIdx][field] = value;
    setRows(newRows);
    setTimesheetData({ ...timesheetData, [weekKey]: newRows });
    console.log(timesheetData);
  };

  const calculateTotals = () => {
    const dayTotals = Array(7).fill(0);
    let grandTotal = 0;

    rows.forEach((row) => {
      row.times.forEach((time, idx) => {
        const mins = timeToMinutes(time);
        dayTotals[idx] += mins;
        grandTotal += mins;
      });
    });

    return {
      rowTotals: rows.map((r) =>
        minutesToTime(r.times.reduce((acc, t) => acc + timeToMinutes(t), 0))
      ),
      dayTotals: dayTotals.map(minutesToTime),
      grandTotal: minutesToTime(grandTotal),
    };
  };

  const { rowTotals, dayTotals, grandTotal } = calculateTotals();

  const addRow = () => {
    setRows([
      ...rows,
      {
        project: '',
        color: 'secondary',
        task: '',
        estimated: '',
        allocated: '',
        times: Array(7).fill(''),
        isNew: true,
      },
    ]);
  };

  console.log(rows);

  const handleProjectSelect = (e, rowIdx) => {
    const val = e.target.value;
    const project = availableProjects.find((p) => p.name === val);
    if (project) {
      const updatedRows = [...rows];
      updatedRows[rowIdx].project = project.name;
      updatedRows[rowIdx].color = project.color;
      updatedRows[rowIdx].isNew = false;
      setRows(updatedRows);
      setTimesheetData({ ...timesheetData, [weekKey]: updatedRows });
    }
  };

  const changeWeek = (delta) => {
    setTimesheetData({ ...timesheetData, [weekKey]: rows });
    setWeekOffset((prev) => prev + delta);
  };

  const copyLastWeek = () => {
    const lastWeek = `week_${weekOffset - 1}`;
    if (timesheetData[lastWeek]) {
      setRows(JSON.parse(JSON.stringify(timesheetData[lastWeek])));
      setTimesheetData({
        ...timesheetData,
        [weekKey]: JSON.parse(JSON.stringify(timesheetData[lastWeek])),
      });
    } else {
      alert('No data for last week.');
    }
  };

  const getWeekLabel = () => {
    if (weekOffset === 0) return 'This week';
    if (weekOffset === -1) return 'Last week';
    if (weekOffset === 1) return 'Next week';
    const start = getWeekStart(weekOffset);
    const end = new Date(start.getTime() + 6 * 86400000);
    const sm = start.toLocaleString('default', { month: 'short' });
    const em = end.toLocaleString('default', { month: 'short' });
    return `${sm} ${start.getDate()} - ${em} ${end.getDate()}, ${start.getFullYear()}`;
  };

  return (
    <div className=" mt-4 ms-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Timesheet</h2>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary" onClick={() => changeWeek(-1)}>
            ◀ Previous
          </button>
          <span className="fw-bold">{getWeekLabel()}</span>
          <button className="btn btn-outline-primary" onClick={() => changeWeek(1)}>
            ▶ Next
          </button>
        </div>
      </div>

      <table className="ms-0 table table-bordered shadow width-max mb-5" id="timesheet-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Task</th>
            <th>Estimated Hours</th>
            <th>Allocated Hours</th>
            {headers.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="timesheet-row" data-project={row.project}>
              <td style={{ minWidth: '140px' }}>
                {row.isNew ? (
                  <select
                    className="form-select"
                    onChange={(e) => handleProjectSelect(e, rowIdx)}
                    defaultValue=""
                  >
                    <option value="">Select project...</option>
                    {availableProjects.map((p, idx) => (
                      <option key={idx} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`badge bg-${row.color}`}>{row.project}</span>
                )}
              </td>
              <td style={{ minWidth: '160px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task description"
                  value={row.task || ''}
                  onChange={(e) => updateField('task', e.target.value, rowIdx)}
                />
              </td>
              <td style={{ minWidth: '120px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="hh:mm"
                  value={row.estimated || ''}
                  onChange={(e) => updateField('estimated', e.target.value, rowIdx)}
                />
              </td>
              <td style={{ minWidth: '120px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="hh:mm"
                  value={row.allocated || ''}
                  onChange={(e) => updateField('allocated', e.target.value, rowIdx)}
                />
              </td>
              {daysOfWeek.map((_, dayIdx) => (
                <td key={dayIdx}>
                  <input
                    type="text"
                    className="form-control time-input"
                    value={row.times[dayIdx]}
                    onChange={(e) => updateTime(e.target.value, rowIdx, dayIdx)}
                    placeholder="hh:mm"
                  />
                </td>
              ))}
              <td className="">{rowTotals[rowIdx]}</td>
            </tr>
          ))}
          <tr className="">
            <td colSpan={4}>Total</td>
            {dayTotals.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
            <td>{grandTotal}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-primary" onClick={addRow}>
          <i className="bi bi-plus-circle p-2 "></i> Add row
        </button>
        <button className="btn btn-outline-primary" onClick={copyLastWeek}>
          Copy last week
        </button>
        <button className="btn btn-outline-primary"> Save as template</button>
      </div>
    </div>
  );
};

export default FinalSubmission;
