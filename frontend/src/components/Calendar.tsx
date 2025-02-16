import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  return (
    <div className="container mt-4">
      <BigCalendar
        localizer={localizer}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calendar;
