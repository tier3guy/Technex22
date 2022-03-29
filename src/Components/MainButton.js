import React from 'react';

const MainButton = (props) => {
  return (
    <button className = {`btn btn-primary font-main shadow-none ${props.class__}`}
            onClick = {props.func}
            id = {props.id}
    >
    {props.text}
    </button>
  )
}

export default MainButton