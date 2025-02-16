import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { mockEvents } from "../mockEvents";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<any>("month");

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };

  const handleNavigate = (date: any) => {
    setCurrentDate(date);
  };

  return (
    <div className="container mt-4">
      <BigCalendar
        events={mockEvents}
        defaultView="day"
        view={currentView}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500 }}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        date={currentDate}
      />
    </div>
  );
};

export default Calendar;
