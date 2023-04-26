import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';


export default function Form(props) {
const [student, setStudent] = useState(props.student || '');
const [interviewer, setInterviewer] = useState(props.interviewer|| null)
const reset = function() {
setStudent('');
 setInterviewer(null);
}
const cancel = function () {
reset();
props.onCancel();
}

    return (
        <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={student}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        value={student}
      />
    </form>
    <InterviewerList 
     interviewers={props.interviewers}
     value={interviewer}
     onChange={(select) => setInterviewer(select)}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => {props.onSave(student, interviewer);}}>Save</Button>
    </section>
  </section>
</main>
    )
}