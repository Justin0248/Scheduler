export function getAppointmentsForDay(state, day) {
const filteredDays = state.days.filter(days => days.name === day);
if (filteredDays.length === 0) {
    return [];
}
const filteredApppointments = filteredDays[0].appointments.map(
appointmentId => state.appointments[appointmentId]
    );
return filteredApppointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
if (filteredDays.length === 0) {
    return [];
}
const filteredInterviewers = filteredDays[0].interviewers.map(
interviewerId => state.interviewers[interviewerId]
    );
return filteredInterviewers;
}

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
const interviews = {
    student: interview.student,
    interviewer: {
        id: state.interviewers[interview.interviewer].id,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar,
    }
}
return interviews
}
