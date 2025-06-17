import React, { useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mode, setMode] = useState("month"); // 'month', 'week', 'day'

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (mode === 'month') newDate.setMonth(newDate.getMonth() + 1);
      if (mode === 'week') newDate.setDate(newDate.getDate() + 7);
      if (mode === 'day') newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const handlePrev = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (mode === 'month') newDate.setMonth(newDate.getMonth() - 1);
      if (mode === 'week') newDate.setDate(newDate.getDate() - 7);
      if (mode === 'day') newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const getHeaderText = () => {
    const options = { year: 'numeric', month: 'long' };
    if (mode === 'week') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    }
    if (mode === 'day') {
        return currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return currentDate.toLocaleDateString(undefined, options);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="navigation">
          <button onClick={handlePrev}>&lt; Prev</button>
          <h2>{getHeaderText()}</h2>
          <button onClick={handleNext}>Next &gt;</button>
        </div>
        <div className="mode-switcher">
          <button onClick={() => setMode('month')} className={mode === 'month' ? 'active' : ''}>Month</button>
          <button onClick={() => setMode('week')} className={mode === 'week' ? 'active' : ''}>Week</button>
          <button onClick={() => setMode('day')} className={mode === 'day' ? 'active' : ''}>Day</button>
        </div>
      </div>
      <div className="calendar-grid">
        {mode === 'month' && <MonthView date={currentDate} />}
        {mode === 'week' && <WeekView date={currentDate} />}
        {mode === 'day' && <DayView date={currentDate} />}
      </div>
    </div>
  );
}