import { useEvents } from "../hooks/useEvents";

const EventList = () => {
  const { data: events, isLoading, isError, error } = useEvents();



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  if (!Array.isArray(events)) {
    return <div>No events found.</div>;
  }



  return (
    <div>
      <ol>
        {events.map((event) => (
          <li key={event.calendarEventId}>
            {event.calendarEventDescription} - {new Date(Number(event.startDate)).toLocaleString()}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EventList;
