import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchEvents } from "../../hooks/useFetchEvents";

const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const { data: events, isLoading, error } = useFetchEvents();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <BigCalendar
        events={events || []}  // Ensure events is an array, even if it's undefined
        localizer={localizer}
        style={{ height: 500 }}
        views={["month", "day"]}
      />
    </div>
  );
};
