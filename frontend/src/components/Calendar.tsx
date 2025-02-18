import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateEventModal from "./CreateEventModal";
import { useMemo, useState } from "react";
import { useFetchEvents } from "../hooks/useEvents";
import DeleteEventModal from "./DeleteEventModal";
import UpdateEventModal from "./UpdateEventModal";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";


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

  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      messages: {
        week: "Semana",
        work_week: "Semana de trabalho",
        day: "Dia",
        month: "Mês",
        previous: "<",
        next: ">",
        today: "Hoje",
        agenda: "Agenda",

        showMore: (total: any) => `+${total} mais`,
      },
    }),
    []
  );
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
          culture="ptBR"
          messages={messages}
          events={events}
          style={{ height: "80vh" }}
          views={["month", "day"]}
          onSelectSlot={handleOpenCreateEventModal}
          onSelectEvent={handleOpenDeleteEventModal}
          selectable
        />
      )}
    </div>
  );
};

export default Calendar;
