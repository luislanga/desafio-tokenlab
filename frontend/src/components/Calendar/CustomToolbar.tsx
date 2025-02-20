import { useState } from "react";
import moment from "moment";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { View } from "react-big-calendar";
import {
  Container,
  ControlsContainer,
  CustomSelector,
  CustomToolbarDate,
  DateButtonsContainer,
  LeftButton,
  RightButton,
  TodayButton,
} from "./CustomToolbarStyles";

interface CustomToolbarProps {
  onNavigate: (view: string) => void;
  onView: (view: View) => void;
  view: View;
  date: Date;
}

export const CustomToolbar = ({
  onNavigate,
  onView,
  view,
  date,
}: CustomToolbarProps) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const handlePrev = () => {
    const newDate = moment(currentDate).subtract(1, "month");
    setCurrentDate(newDate);
    onNavigate("PREV");
  };

  const handleNext = () => {
    const newDate = moment(currentDate).add(1, "month");
    setCurrentDate(newDate);
    onNavigate("NEXT");
  };

  const handleToday = () => {
    const newDate = moment();
    setCurrentDate(newDate);
    onNavigate("TODAY");
  };

  const formattedMonthDate = date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });

  const displayMonthDate =
    formattedMonthDate.charAt(0).toUpperCase() + formattedMonthDate.slice(1);

  const formattedDayDate = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });

  return (
    <Container>
      <CustomToolbarDate>
        {view === "day" ? formattedDayDate : displayMonthDate}
      </CustomToolbarDate>
      <ControlsContainer>
        <CustomSelector value={view} onChange={(e) => onView(e.target.value as View)}>
          <option value="month">Mês</option>
          <option value="day">Dia</option>
        </CustomSelector>
        <DateButtonsContainer>
          <TodayButton onClick={handleToday}>Hoje</TodayButton>
          <div>
            <LeftButton onClick={handlePrev}>
              <FaChevronLeft />
            </LeftButton>
            <RightButton onClick={handleNext}>
              <FaChevronRight />
            </RightButton>
          </div>
        </DateButtonsContainer>
      </ControlsContainer>
    </Container>
  );
};
