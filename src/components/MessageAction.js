import React from 'react';

export default function MessageAction({message, className}) {

  return (
    <span className={className}>
      {message}
    </span>
  )
}

MessageAction.PropTypes = {
  message: React.PropTypes.string,
  className: React.PropTypes.string
}
