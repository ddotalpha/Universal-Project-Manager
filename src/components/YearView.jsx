import React from 'react';

const MiniMonth = ({ year, month, onSelectMonth }) => {
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<span key={`empty-${i}`} className="other-month"></span>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(<span key={i}>{i}</span>);
  }

  return (
    <div className="mini-month" onClick={() => onSelectMonth(month)}>
      <div className="mini-month-header">{monthName}</div>
      <div className="mini-month-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className='day-name'>{d}</span>)}
        {days}
      </div>
    </div>
  );
};

export default function YearView({ date, onSelectMonth }) {
  const year = date.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="year-view">
      {months.map(monthIndex => (
        <MiniMonth key={monthIndex} year={year} month={monthIndex} onSelectMonth={onSelectMonth} />
      ))}
    </div>
  );
}