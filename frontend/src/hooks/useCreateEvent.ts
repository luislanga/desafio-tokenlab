import { useMutation } from "@tanstack/react-query";
import { useApi } from "../api";
import { queryClient } from "../main";

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