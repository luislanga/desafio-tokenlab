import { useMutation } from "@tanstack/react-query";
import { useApi } from "../api";
import { queryClient } from "../main";

interface UpdateEventVariables {
  title: string;
  start: string;
  end: string;
  calendarEventId: string;
}

const updateEvent = async (
  variables: UpdateEventVariables,
  api: any
) => {
  const updateEventRequest = {
    calendarEventDescription: variables.title,
    startDate: variables.start,
    endDate: variables.end,
  };
  const response = await api.put(
    `/event/${variables.calendarEventId}`,
    updateEventRequest
  );
  return response.data;
};

export const useUpdateEvent = () => {
  const api = useApi();
  return useMutation({
    mutationFn: (variables: UpdateEventVariables) => updateEvent(variables, api),
    onSuccess(_, variables: UpdateEventVariables) {
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