import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';


export default function Form(props) {
const [student, setStudent] = useState(props.student || '');
const [interviewer, setInterviewer] = useState(props.interviewer || null)
const [error, setError] = useState("");
const reset = function() {
setStudent('');
 setInterviewer(null);
}
const cancel = function () {
reset();
props.onCancel();
setError('');
}
function validate() {
  if (student === "") {
    setError("Student name cannot be blank");
    return;
  }
  
  else if (interviewer === null) {
    setError("Please select an interviewer");
    return;
  }

  setError("");
  props.onSave(student, interviewer);
}
    return (
        <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name='name'
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        value={student}
        data-testid={'student-name-input'}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
     interviewers={props.interviewers}
     value={interviewer}
     onChange={(select) => setInterviewer(select)}
     alt="Sylvia Palmer"
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel} >Cancel</Button>
      <Button 
      confirm onClick={() => {if (validate()){props.onSave(student, interviewer);}}}>Save</Button>
    </section>
  </section>
</main>
    )
}