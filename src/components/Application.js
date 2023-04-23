import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from './Appointment/index'
import getAppointmentsForDay from './helpers/selectors'
// import DayListItem from "./DayListItem";
// import Button from "./Button";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
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
      <section className="schedule" >
     {dailyAppointments.map((appointment) => (
     <Appointment 
  key={appointment.id} 
  {...appointment} 
/>))}
     <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
