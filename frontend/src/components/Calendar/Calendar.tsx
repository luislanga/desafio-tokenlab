import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  View,
} from "react-big-calendar";
import moment from "moment";
import { useFetchEvents } from "../../hooks/useFetchEvents";
import { useState } from "react";
import { CreateEventModal } from "../CreateEventModal/CreateEventModal";
import { UpdateEventModal } from "../EditEventModal/EditEventModal";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { CustomToolbar } from "./CustomToolbar";
import { Container } from "./CalendarStyles";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./override.css";

const locales = {
  ptBR: ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  showMore: (total: number) => `+${total} eventos`,
};

export const Calendar = () => {
  const [createEventModalIsOpen, setCreateEventModalIsOpen] = useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any>(null);

  const [updateEventModalIsOpen, setUpdateEventModalIsOpen] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState<any>(null);

  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());

  const handleOpenCreateEventModal = (slotInfo: any) => {
    setCreateEventModalIsOpen(true);
    setSelectedSlotInfo(slotInfo);
  };

  const handleOpenUpdateEventModal = (eventInfo: any) => {
    setUpdateEventModalIsOpen(true);
    setSelectedEventInfo(eventInfo);
  };

  const { data: events, isLoading, error } = useFetchEvents();

  if (isLoading) return <LoadingSpinner color="light" />;
  if (error) return <div>Error: {error.message}</div>;

  const handleNavigate = (action: string) => {
    let newDate = moment(date);

    if (view === "month") {
      if (action === "PREV") newDate = newDate.subtract(1, "month");
      if (action === "NEXT") newDate = newDate.add(1, "month");
    } else if (view === "day") {
      if (action === "PREV") newDate = newDate.subtract(1, "day");
      if (action === "NEXT") newDate = newDate.add(1, "day");
    }

    if (action === "TODAY") newDate = moment();

    setDate(newDate.toDate());
  };

  return (
    <Container>
      <CustomToolbar
        onNavigate={handleNavigate}
        onView={setView}
        date={date}
        view={view}
      />
      <BigCalendar
        messages={messages}
        localizer={localizer}
        culture="ptBR"
        popup
        events={events}
        selectable
        date={date}
        view={view}
        onNavigate={setDate}
        onView={setView}
        onSelectSlot={handleOpenCreateEventModal}
        onSelectEvent={handleOpenUpdateEventModal}
        views={["month", "day"]}
        style={{ height: 500 }}
        toolbar={false}
        longPressThreshold={0}
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
    </Container>
  );
};
