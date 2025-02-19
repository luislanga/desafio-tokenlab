import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import { useState } from "react";
import { CreateEventModal } from "../CreateEventModal/CreateEventModal";
import { UpdateEventModal } from "../EditEventModal/EditEventModal";

const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any>(null);

  const [updateEventModalIsOpen, setUpdateEventModalIsOpen] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);

  const handleOpenCreateEventModal = (slotInfo: any) => {
    setCreateEventModalIsOpen(true);
    setSelectedSlotInfo(slotInfo);
  };

  const handleOpenUpdateEventModal = (eventInfo: any) => {
    setUpdateEventModalIsOpen(true);
    setSelectedEventInfo(eventInfo);
  };

  const { data: events, isLoading, error } = useFetchEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <BigCalendar
        events={events}
        selectable
        onSelectSlot={handleOpenCreateEventModal}
        onSelectEvent={handleOpenUpdateEventModal}
        localizer={localizer}
        style={{ height: 500 }}
        views={["month", "day"]}
      />
      {createEventModalIsOpen && (
        <CreateEventModal
          startDate={selectedSlotInfo?.start}
          onClose={() => setCreateEventModalIsOpen(false)}
        />
      )}
      {updateEventModalIsOpen && (
        <UpdateEventModal
          title={selectedEventInfo?.title}
          startDate={selectedEventInfo?.start}
          endDate={selectedEventInfo?.end}
          calendarEventId={selectedEventInfo?.calendarEventId}
          onClose={() => setUpdateEventModalIsOpen(false)}
        />
      )}
    </div>
  );
};
