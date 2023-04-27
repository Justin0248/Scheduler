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
  
  const updateSpots = function (state) {
    const arr = [];
    for (let key of state.days) {
      let count = 0;
      for (let id of key.appointments) {
        if (state.appointments[id].interview === null) count += 1;
      }
      key.spots = count;
      arr.push(key);
    }
        setState({
          ...state,
          days: arr
        });
      };
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
          updateSpots(newAppointment)
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
            updateSpots(newAppointment);
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