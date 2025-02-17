import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryClient } from "../main";

// FETCH EVENTS
const fetchEvents = async () => {
  try {
    const response = await api.get("/event");
    const events = response.data.map((event: any) => ({
      calendarEventId: event.calendarEventId,
      hostId: event.hostId,
      title: event.calendarEventDescription,
      start: new Date(Number(event.startDate)),
      end: new Date(Number(event.endDate)),
    }));
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};

// DELETE EVENTS
const deleteEvent = async (calendarEventId: any) => {
  try {
    const response = await api.delete(`/event/${calendarEventId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess(_, calendarEventId) {
      const cached = queryClient.getQueryData(["events"]);
      queryClient.setQueryData(["events"], (data: any) => {
        return data.filter(
          (event: any) => event.calendarEventId !== calendarEventId
        );
      });
    },
  });
};

// CREATE EVENTS
const createEvent = async ({ title, start, end }: any) => {
  try {
    const createEventRequest: any = {
      calendarEventDescription: title,
      startDate: start,
      endDate: end,
      guests: [],
    };
    const response = await api.post("/event", createEventRequest);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const useCreateEvent = () => {

  return useMutation({
    mutationFn: createEvent,
    onSuccess(data, variables) {

      const cachedEvents = queryClient.getQueryData(["events"]);

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



// UPDATE EVENTS

const updateEvent = async ({ title, start, end, calendarEventId }: any) => {
  try {
    const updateEventRequest: any = {
      calendarEventDescription: title,
      startDate: start,
      endDate: end,
    };
    const response = await api.put(
      `/event/${calendarEventId}`,
      updateEventRequest
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: updateEvent,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(["events"]);
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
