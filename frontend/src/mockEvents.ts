import { Event } from "react-big-calendar";

interface CreateEventRequest {
  title: string;
  start: Date;
  end: Date;
}

export const fetchMockEvents = async () => {
  return await new Promise<Event[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Meeting with Team",
          start: new Date(2025, 1, 3, 10, 0), // Feb 3, 2025, 10:00 AM
          end: new Date(2025, 1, 3, 11, 0), // Feb 3, 2025, 11:00 AM
        },
        {
          title: "Lunch with Client",
          start: new Date(2025, 1, 4, 12, 0), // Feb 4, 2025, 12:00 PM
          end: new Date(2025, 1, 4, 13, 0), // Feb 4, 2025, 1:00 PM
        },
        {
          title: "Project Presentation",
          start: new Date(2025, 1, 5, 14, 0), // Feb 5, 2025, 2:00 PM
          end: new Date(2025, 1, 5, 15, 0), // Feb 5, 2025, 3:00 PM
        },
      ]);
    }, 500);
  });
};



