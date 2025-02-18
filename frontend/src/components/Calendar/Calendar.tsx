import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import { useState } from "react";
import { CreateEventModal } from "../CreateEventModal/CreateEventModal";

const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any>(null);

  const handleOpenCreateEventModal = (slotInfo: any) => {
    setCreateEventModalIsOpen(true);
    setSelectedSlotInfo(slotInfo);
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
    </div>
  );
};
