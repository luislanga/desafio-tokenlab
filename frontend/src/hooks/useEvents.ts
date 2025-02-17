import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { queryClient } from "../main";

// Helper function to initialize axios with token
const useApi = () => {
  const auth = useAuth();
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${auth.user?.id_token}`,
    },
  });
};

// FETCH EVENTS
const fetchEvents = async (api: any) => {
  const response = await api.get("/event");
  const events = response.data.map((event: any) => ({
    calendarEventId: event.calendarEventId,
    hostId: event.hostId,
    title: event.calendarEventDescription,
    start: new Date(Number(event.startDate)),
    end: new Date(Number(event.endDate)),
  }));
  return events;
};

export const useFetchEvents = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(api),
  });
};

// DELETE EVENT
const deleteEvent = async (calendarEventId: any, api: any) => {
  const response = await api.delete(`/event/${calendarEventId}`);
  return response.data;
};

export const useDeleteEvent = () => {
  const api = useApi();
  return useMutation({
    mutationFn: (calendarEventId) => deleteEvent(calendarEventId, api),
    onSuccess(_, calendarEventId) {
      queryClient.setQueryData(["events"], (data: any) => {
        return data.filter((event: any) => event.calendarEventId !== calendarEventId);
      });
    },
  });
};

// CREATE EVENT
const createEvent = async ({ title, start, end }: any, api: any) => {
  const createEventRequest = {
    calendarEventDescription: title,
    startDate: start,
    endDate: end,
    guests: [],
  };
  const response = await api.post("/event", createEventRequest);
  return response.data;
};

export const useCreateEvent = () => {
  const api = useApi();
  return useMutation({
    mutationFn: (variables: any) => createEvent(variables, api),
    onSuccess(data, variables) {
      queryClient.setQueryData(["events"], (oldEvents: any[]) => [
        ...oldEvents,
        {
          title: variables.title,
          start: new Date(Number(variables.start)),
          end: new Date(Number(variables.end)),
          calendarEventId: data.calendarEventId,
        },
      ]);
    },
  });
};

// UPDATE EVENT
const updateEvent = async ({ title, start, end, calendarEventId }: any, api: any) => {
  const updateEventRequest = {
    calendarEventDescription: title,
    startDate: start,
    endDate: end,
  };
  const response = await api.put(
    `/event/${calendarEventId}`,
    updateEventRequest
  );
  return response.data;
};

export const useUpdateEvent = () => {
  const api = useApi();
  return useMutation({
    mutationFn: (variables) => updateEvent(variables, api),
    onSuccess(_, variables: any) {
      queryClient.setQueryData(["events"], (data: any) => {
        return data.map((event: any) => {
          if (event.calendarEventId === variables.calendarEventId) {
            return {
              ...event,
              title: variables.title,
              start: new Date(Number(variables.start)),
              end: new Date(Number(variables.end)),
            };
          }
          return event;
        });
      });
    },
  });
};
