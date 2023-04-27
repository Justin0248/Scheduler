import React from 'react'
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error'
import { useVisualMode } from 'hooks/useVisualMode';

export default function Appointment(props) {
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
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
 .catch(error => transition(ERROR_SAVE, true))
}

const remove = function() {
const interview = {
  student: null,
  interviewer: null
};
transition(DELETE, true)
props.removeInterview(props.id)
.then(() =>transition(EMPTY))
.catch(error => transition(ERROR_DELETE, true))
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
        {mode === ERROR_SAVE && <Error
         message="Could not save appointment" 
         onClose={back}/>}
        {mode === ERROR_DELETE && <Error 
        message="Could not delete appointment"
         onClose={back}/>}
    </article>
     )
}
