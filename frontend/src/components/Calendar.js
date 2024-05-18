import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://famous-jade-vest.cyclic.app/events');
        const calendarEvents = response.data.map(event => ({
          title: event.title,
          start: new Date(event.date + ' ' + event.time),
          end: new Date(new Date(event.date + ' ' + event.time).getTime() + event.duration * 60 * 60 * 1000),
          ...event,
        }));
        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = { start, end, title };
      setEvents([...events, newEvent]);
      axios.post('https://famous-jade-vest.cyclic.app/events', {
        title,
        date: moment(start).format('DD-MM-YYYY'),
        time: moment(start).format('hh:mm A'),
        duration: (end - start) / (1000 * 60 * 60),
        participants: [],
        description: '',
        notes: '',
      }).catch(error => {
        console.error('Error saving event:', error);
      });
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      onSelectSlot={handleSelectSlot}
    />
  );
};

export default CalendarComponent;
