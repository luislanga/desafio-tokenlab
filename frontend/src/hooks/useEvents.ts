import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchEvents = async () => {
  try {
    const response = await api.get("/event");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
