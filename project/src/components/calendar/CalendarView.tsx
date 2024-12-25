import React from 'react';
import { motion } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '../../store';
import { format } from 'date-fns';

export default function CalendarView() {
  const { communications, companies, communicationMethods } = useStore();

  const events = communications.map((comm) => {
    const company = companies.find((c) => c.id === comm.companyId);
    const method = communicationMethods.find((m) => m.id === comm.methodId);

    return {
      id: comm.id,
      title: `${company?.name} - ${method?.name}`,
      date: comm.date,
      backgroundColor: comm.completed ? '#10B981' : '#3B82F6',
      extendedProps: {
        notes: comm.notes,
        company: company?.name,
        method: method?.name,
      },
    };
  });

  const handleEventClick = (info: any) => {
    const { notes, company, method } = info.event.extendedProps;
    alert(`
      Company: ${company}
      Method: ${method}
      Date: ${format(new Date(info.event.start), 'PPP')}
      Notes: ${notes || 'No notes'}
    `);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
      />
    </motion.div>
  );
}