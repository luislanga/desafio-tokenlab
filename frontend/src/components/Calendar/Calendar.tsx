import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { mockEvents } from "../../mockEvents";

const localizer = momentLocalizer(moment);

export const Calendar = () => {


  return (
    <div className="container mt-4">
      <BigCalendar
        events={mockEvents}
        localizer={localizer}
        style={{ height: 500 }}
        views={["month", "day"]}
      />
    </div>
  );
};

