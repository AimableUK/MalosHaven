import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from '@fullcalendar/rrule'


function Calendar() {
  const [events, setEvents] = useState([
    { title: "Work Meeting", date: "2025-04-12", color: "blue" },
    { title: "Doctor Appointment", date: "2025-04-14", color: "red" },
    {
      title: "Weekly Meeting",
      rrule: {
        freq: "weekly",
        interval: 1, // Every week
        byweekday: ["mo"], // Monday
        dtstart: "2025-04-15T10:00:00",
        until: "2025-12-31",
      },
    }
  ]);

  const handleEventDrop = (eventDropInfo) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventDropInfo.event.id
          ? {
              ...event,
              start: eventDropInfo.event.startStr,
              end: eventDropInfo.event.endStr,
            }
          : event
      )
    );
  };

  const handleEventResize = (eventResizeInfo) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventResizeInfo.event.id
          ? {
              ...event,
              start: eventResizeInfo.event.startStr,
              end: eventResizeInfo.event.endStr,
            }
          : event
      )
    );
  };

  const colors = ["red", "blue", "yellow", "green", "orange", "grey"];

  const handleDateClick = (info) => {
    const title = prompt("enter the event name");
    const color= prompt("Choose one color: red, blue, yellow, green, orange, grey")
    if (title && colors.includes(color)) {
      setEvents([...events, { title, date: info.dateStr, color }]);
    } else {
      alert("Invalid color selected.");
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete "${clickInfo.event.title}"?`)) {
      clickInfo.event.remove(); 
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
    }
  };

  return (
    <FullCalendar
      plugins={[rrulePlugin, listPlugin, timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next, today",
        center: "title",
        right: "dayGidMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      editable={true}
      events={events}
      eventClick={handleEventClick}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      eventResizableFromStart={true}
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
