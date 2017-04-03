import React from 'react';
import MessageAction from './MessageAction';

export default function AddUserForm({
  onValidationName,
  onValidationEmail,
  onChangeInput,
  newUserName,
  newUserEmail,
  isValidName,
  isValidEmail,
  showValidationMsgName,
  showValidationMsgEmail,
  showIsEmailMsg
}) {

  return (
    <span>
       <input type="text"
              className={( newUserName.length === 0 ? 'input' : isValidName ? 'input input__success' : 'input input__error')}
              onKeyUp={onValidationName}
              name="newUserName"
              id="userName"
              placeholder="Name..."
              value={newUserName}
              onChange={onChangeInput}
              autoFocus  />
            { showValidationMsgName && <MessageAction className="message__action--invalid" message="Length must be at least 3-20 characters" />}
       <input type="email"
              className={( newUserEmail.length === 0 ? 'input' : isValidEmail && !showIsEmailMsg ? 'input input__success' : 'input input__error')}
              onKeyUp={onValidationEmail}
              name="newUserEmail"
              id="userEmail"
              placeholder="E-mail..."
              value={newUserEmail}
              onChange={onChangeInput}  />
            { showValidationMsgEmail ? <MessageAction className="message__action--invalid" message="E-mail is invalid" /> : showIsEmailMsg && <MessageAction className="message__action--invalid" message="E-mail exist" />}
       <button type="submit"
               className="btn btn__submit">
               Submit
       </button>
    </span>
  )
}

AddUserForm.PropTypes = {
  onValidationName: React.PropTypes.func,
  onValidationEmail: React.PropTypes.func,
  onChangeInput: React.PropTypes.func,
  newUserName: React.PropTypes.string,
  newUserEmail: React.PropTypes.string,
  isValidName: React.PropTypes.bool,
  isValidEmail: React.PropTypes.bool,
  showValidationMsgName: React.PropTypes.bool,
  showValidationMsgEmail: React.PropTypes.bool,
  showIsEmailMsg: React.PropTypes.bool
}
