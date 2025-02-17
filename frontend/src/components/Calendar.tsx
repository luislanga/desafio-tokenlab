import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEventModal from "./CreateEventModal";
import { useState } from "react";
import { useFetchEvents } from "../hooks/useEvents";
import DeleteEventModal from "./DeleteEventModal";
import UpdateEventModal from "./UpdateEventModal";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { data: events, isLoading, error } = useFetchEvents();

  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);
  const [updateModalEventIsOpen, setUpdateModalEventIsOpen] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any>(null);

  const handleOpenCreateEventModal = (slotInfo: any) => {
    setCreateEventModalIsOpen(true);
    setSelectedSlotInfo(slotInfo);
  };

  const handleOpenDeleteEventModal = (eventInfo: any) => {
    setUpdateModalEventIsOpen(true);
    setSelectedEventInfo(eventInfo);
  };

  return (
    <div className="container mt-4">
      {createEventModalIsOpen && (
        <CreateEventModal
          startDate={selectedSlotInfo.start}
          onClose={() => setCreateEventModalIsOpen(false)}
        />
      )}
      {updateModalEventIsOpen && (
        <UpdateEventModal
          event={selectedEventInfo}
          onClose={() => setUpdateModalEventIsOpen(false)}
        />
      )}
      {updateModalEventIsOpen && (
        <DeleteEventModal
          event={selectedEventInfo}
          onClose={() => setUpdateModalEventIsOpen(false)}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading events</p>
      ) : (
        <BigCalendar
          localizer={localizer}
          events={events}
          style={{ height: 500 }}
          views={["month", "week", "day"]}
          onSelectSlot={handleOpenCreateEventModal}
          onSelectEvent={handleOpenDeleteEventModal}
          selectable
        />
      )}
    </div>
  );
};

export default Calendar;
