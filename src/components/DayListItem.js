import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
const formatSpots = function() {
if (props.spots > 1) {
    return props.spots + ' spots remaining';
}
else if (props.spots === 1) {
    return props.spots + ' spot remaining';
}
else if (props.spots === 0) {
    return 'no spots remaining';
}
}

    const dayClass = classNames('day-list__item', {
        'day-list__item--unselected': props.unselected,
        'day-list__item--selected': props.selected,
        'day-list__item--full': props.full,
        'day-list__item--clickable': props.clickable
    })
  return (
  <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}
  >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}