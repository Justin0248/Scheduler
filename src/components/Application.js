import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from './Appointment/index'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from './helpers/selectors';
import useVisualMode from '../hooks/useVisualMode'
// import DayListItem from "./DayListItem";
// import Button from "./Button";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const setDay = day => setState({ ...state, day });
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }
  useEffect(() => {
Promise.all([
  axios.get('/api/days'),
  axios.get('/api/appointments'),
  axios.get('/api/interviewers')
]).then((all) => {
  const [days, appointments, interviewers] = all;
  setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
});
}, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<DayList
days={state.days}
day={state.day} 
setDay={setDay}

  />
<nav className="sidebar__menu"></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
  {appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment 
    key={appointment.id} 
    {...appointment} 
    bookInterview={bookInterview} 
    interviewers={interviewers}/>;
  })}
  <Appointment key="last" time="5pm" />
</section>
    </main>
  );
}
