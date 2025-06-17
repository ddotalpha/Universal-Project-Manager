import React from 'react';

export default function MonthView({ date }) {
  const getMonthGrid = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          grid.push(<div key={`empty-${i}-${j}`} className="day-cell other-month"></div>);
        } else if (day > daysInMonth) {
          grid.push(<div key={`empty-${i}-${j}`} className="day-cell other-month"></div>);
        } else {
          grid.push(
            <div key={`day-${day}`} className="day-cell">
              <span className="day-number">{day}</span>
            </div>
          );
          day++;
        }
      }
    }
    return grid;
  };

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
    <div key={day} className="day-header">{day}</div>
  ));

  return (
    <>
      {dayHeaders}
      {getMonthGrid()}
    </>
  );
}