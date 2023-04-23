export default function getAppointmentsForDay(state, day) {
const filteredDays = state.days.filter(days => days.name === day);
if (filteredDays.length === 0) {
    return [];
}
const filteredApppointments = filteredDays[0].appointments.map(
appointmentId => state.appointments[appointmentId]
    );
return filteredApppointments;
}
