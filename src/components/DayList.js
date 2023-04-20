import React from 'react';
import classNames from "classnames";
import DayListItem from './DayListItem'

export default function DayList(props) {
    const dayList = props.days.map((day) => {
        return (
            <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay}
            full={day.spots === 0}
            />   
        )
    })
    return(
        <ul>
            {dayList}
        </ul>
      )
    }