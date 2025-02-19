import { useMutation } from "@tanstack/react-query";
import { useApi } from "../api";
import { queryClient } from "../main";

const deleteEvent = async (calendarEventId: string, api: any) => {
  const response = await api.delete(`/event/${calendarEventId}`);
  return response.data;
};

export const useDeleteEvent = () => {
  const api = useApi();
  return useMutation({
    mutationFn: (calendarEventId: string) => deleteEvent(calendarEventId, api),
    onSuccess(_, calendarEventId: string) {
      queryClient.setQueryData(["events"], (data: any) => {
        return data.filter(
          (event: any) => event.calendarEventId !== calendarEventId
        );
      });
    },
  });
};
