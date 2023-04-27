import React from 'react'
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import { useVisualMode } from 'hooks/useVisualMode';

export default function Appointment(props) {
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
let message;
const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
)
const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
 props.bookInterview(props.id, interview)
 .then(() => transition(SHOW))
 .catch(error => console.log('error'))
}

const remove = function() {
const interview = {
  student: null,
  interviewer: null
};
transition(DELETE)
props.removeInterview(props.id)
.then(() =>transition(EMPTY))
}

 return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
        <Show
            student={props.interview.student}   
            interviewers={props.interview.interviewer}
            onDelete={() => { transition(CONFIRM)}}
            onEdit={() => transition(EDIT)}
        />
    )}
            {mode === EDIT && <Form
            interviewers={props.interviewers}
            onCancel={back} 
            onSave={save}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviews={props.interviewers}/>}
            {mode === SAVING && <Status message="Saving"/>}
            {mode === DELETE && <Status message="Deleting"/>}
            {mode === CONFIRM && <Confirm
            onConfirm={remove}
            onCancel={back}
            message="Confirm?"
            />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onCancel={back} 
        onSave={save}/>}
    </article>
     )
}
