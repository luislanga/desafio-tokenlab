import { useQuery } from "@tanstack/react-query";
import { useApi } from "../api";

const fetchEvents = async (api: any) => {
  const response = await api.get("/event");
  const events = response.data.map((event: any) => ({
    calendarEventId: event.calendarEventId,
    hostId: event.hostId,
    title: event.calendarEventDescription,
    start: new Date(Number(event.startDate)),
    end: new Date(Number(event.endDate)),
  }));
  console.log(events);
  return events;
};

export const useFetchEvents = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(api),
  });
};
