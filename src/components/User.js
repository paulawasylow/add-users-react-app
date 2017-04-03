import React from 'react';

export default function User({i, user, onRemoveUser}) {

  return (
    <tr className="table__body--tr">
     <td>
       <span className="badge-lp" data-count={i}></span>
     </td>
     <td>
       {user.name}
     </td>
     <td>
       {user.email}
       <button className="btn__remove"
               data-content="remove"
               value={user.id}
               onClick={onRemoveUser}>+
       </button>
     </td>
    </tr>
  )
}

User.PropTypes = {
  user: React.PropTypes.object,
  i: React.PropTypes.number,
  onRemoveUser: React.PropTypes.func
}
