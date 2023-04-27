import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from './Appointment/index'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from './helpers/selectors';
import useApplicationData from '../hooks/useApplicationData'
// import DayListItem from "./DayListItem";
// import Button from "./Button";
import "components/Application.scss";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    removeInterview,
  } = useApplicationData();
  

  const interviewers = getInterviewersForDay(state, state.day);
  console.log(state.days)
console.log(state.appointments)

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          removeInterview={removeInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}