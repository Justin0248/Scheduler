import axios from 'axios'
import { useState, useEffect} from 'react';
const useApplicationData = function() {
const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
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
    return axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          const newAppointment = { ...state, appointments };
          setState(newAppointment);
        })
    };

    const removeInterview = function(id)  {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.delete(`/api/appointments/${id}`)
          .then(() => {
            const newAppointment = { ...state, appointments };
            setState(newAppointment);
          })
      };
  
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
    return { state, setDay, bookInterview, removeInterview }
}

export default useApplicationData