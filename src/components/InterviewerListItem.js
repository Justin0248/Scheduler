import React from 'react';
import 'components/InterviewerListItems.scss'
import classNames from "classnames";

export default function InterviewerListItem(props) {
    const selected = props.selected ? props.name : ''
    const interviewer = {
        id: props.id,
        name: props.name,
        avatar: props.avatar
    }
    const nameClass = classNames('interviewers__item', { 
        'interviewers__item--selected': props.selected,
        'interviewers__item--unselected': props.unselected,
        'interviewers__item--clickable': props.clickable
    })
    return (
        <l1 onClick ={() => props.setInterviewer(props.name)} 
         className={nameClass}>
         <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
  />
           {selected}
        </l1>
    )
}