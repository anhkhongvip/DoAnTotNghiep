import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";

import styled from "styled-components";
type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type Props = {
    date: [Range];
    setDate: (date: [Range]) => void;
}
const CalendarStyles = styled.div``;
const Calendar = ({date, setDate}: Props) => {
  return (
    <CalendarStyles>
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
      />
    </CalendarStyles>
  );
};

export default Calendar;
