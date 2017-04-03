import React, { Component } from 'react';
import User from '../components/User';
import AddUserForm from '../components/AddUserForm';
import MessageAction from '../components/MessageAction';

class UsersListContainer extends Component {

  static propTypes: {
    users: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired
  }

  state = {
  users: [
   {
     id: 1,
     name: "Wes Bos",
     email: "wes.bos@gmail.com"
   },
   {
     id: 2,
     name: "Dan Abramov",
     email: "dan.abramov@gmail.com"
   },
   {
     id: 3,
     name: "Eric Elliott",
     email: "eric.elliott@gmail.com"
   },
   {
     id: 4,
     name: "Mattias Pettersson",
     email: "mattias.pettersson@gmail.com"
   },
   {
     id: 5,
     name: "Todd Motto",
     email: "todd.motto@gmail.com"
   },
   {
     id: 6,
     name: "Jaime García",
     email: "jg.garcia@gmail.com"
   },
   {
     id: 7,
     name: "Lea Verou",
     email: "lea.verou@gmail.com"
   },
   {
     id: 8,
     name: "Nicolás Bevacqua",
     email: "nicolas.bevacqua@gmail.com"
   }
 ],
 showForm: false,
 showBtnAddUser: true,
 successMsg: false,
 isValidName: false,
 isValidEmail: false,
 showClearBtn: false,
 showValidationMsgName: false,
 showValidationMsgEmail: false,
 showIsEmailMsg: false
 }

 onShowForm = (e) => {
   e.preventDefault();

   this.setState({
     showForm: true,
     showBtnAddUser: false,
     successMsg: false,
     newUserName: '',
     newUserEmail: ''
  });
 }


 onValidationName = () => {
   const regexName = new RegExp(/^[a-zA-Z+\sa-zA-Z]{3,20}$/);
   const isValidName = regexName.test(this.state.newUserName);

   if (!isValidName) {
     this.setState({
     isValidName: false,
     showValidationMsgName: true
   });
     return console.log(`invalid Name`);
   }

     this.setState({
     isValidName: true,
     showValidationMsgName: false
   });
     return console.log(`valid Name`);
 }

 onValidationEmail = () => {
   const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   const isValidEmail = regexEmail.test(this.state.newUserEmail);
   const isEmailExist = this.state.users.map(user => user.email.includes(this.state.newUserEmail)).includes(true);

   if (!isValidEmail) {
     this.setState({
     isValidEmail: false,
     showValidationMsgEmail: true
   });
     return console.log(`invalid E-mail`);
   }

   else if (isEmailExist) {
     this.setState({
       showIsEmailMsg: true
     })
   }

     this.setState({
     isValidEmail: true,
     showValidationMsgEmail: false
   });
     return console.log(`valid E-mail`);
 }

 onSubmitAddUser = (e) => {
   e.preventDefault();

   const newId = Date.now();
   const newUser = {id: newId, name: this.state.newUserName, email: this.state.newUserEmail};
   const newUsersList = [newUser, ...this.state.users];
   const isEmailExist = this.state.users.map(user => user.email.includes(this.state.newUserEmail));
   const isValidForm = this.state.isValidName && this.state.isValidEmail;

   if (isEmailExist.includes(true) || !isValidForm) {
     return;
   }

   this.setState({
     users: newUsersList,
     newUserName: '',
     newUserEmail: '',
     showBtnAddUser: true,
     showForm: false,
     successMsg: true,
     isValidName: false,
     isValidEmail: false,
     showClearBtn: false,
     showIsEmailMsg: false
   });
 }

onClearBtn = () => {
  this.setState({
    newUserName: '',
    newUserEmail: '',
    isValidName: false,
    isValidEmail: false,
    showValidationMsgName: false,
    showValidationMsgEmail: false,
    showIsEmailMsg: false
  });
}

onShowClearBtn = (name, value) => {
  if (this.state[name].value !== '') {
    this.setState({showClearBtn: true});
  }
}

onChangeInput = (e) => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

    this.setState({
      [name]: value
    });

     this.onShowClearBtn(name, value);
}

 onRemoveUser = (e) => {
   e.preventDefault();

   const findUserById = this.state.users.findIndex(user => user.id === +e.target.value);
   const newUsersList = [
     ...this.state.users.slice(0,findUserById),
     ...this.state.users.slice(findUserById+1)
   ];

   this.setState({
     users: newUsersList,
     successMsg: false
   });
  }

  render() {

    const {
      users,
      showBtnAddUser,
      showForm,
      newUserName,
      newUserEmail,
      successMsg,
      showClearBtn,
      showIsEmailMsg,
      showValidationMsgName,
      showValidationMsgEmail,
      isValidName, isValidEmail
    } = this.state;

    const userList = users.map((user, i = 1) => {
      return <User key={user.id}
                   i={i+1}
                   onRemoveUser={this.onRemoveUser}
                   user={user} />
    });

    const LIMIT_USERS = 10;

    const isLimitUsers = users.length === LIMIT_USERS;

    return (
      <div className="container">
        <header className="header">

          <form onSubmit={this.onSubmitAddUser}>
          { showBtnAddUser && <button className="btn btn__add"
                                      onClick={this.onShowForm}
                                      disabled={isLimitUsers ? true : false}>
                                      <span className="badge-icon"
                                            data-count="+">
                                      </span>
                                      Add user
                              </button>
          }
          { isLimitUsers ? <MessageAction className="message__action--warning"
                                          message="You can't add new user because of a limit" />
                         : successMsg && <MessageAction className="message__action--success"
                                                        message="You have successfully added an user" />
          }
          { isLimitUsers ? showForm === false
                         : showForm && <AddUserForm onValidationName={this.onValidationName}
                                                    onValidationEmail={this.onValidationEmail}
                                                    onChangeInput={this.onChangeInput}
                                                    isValidName={isValidName}
                                                    isValidEmail={isValidEmail}
                                                    showValidationMsgName={showValidationMsgName}
                                                    showValidationMsgEmail={showValidationMsgEmail}
                                                    newUserName={newUserName}
                                                    newUserEmail={newUserEmail}
                                                    showIsEmailMsg={showIsEmailMsg} />
          }
          { showClearBtn && <button className="btn__clear--danger"
                                    onClick={this.onClearBtn}>
                                    Reset fields
                            </button>
          }
          </form>

        </header>
        <main>

          <table className="table">
          <thead className="table__header">

            <tr className="table__header--tr">
              <th>lp</th>
              <th>user</th>
              <th>email</th>
            </tr>

          </thead>

          <tbody className="table__body">
            { userList.length > 0 && userList }
          </tbody>

          </table>

            { userList.length === 0 && <MessageAction className="message__action--no-users"
                                                      message="No users on list, add user" />
            }

        </main>
      </div>
    )
  }
}

export default UsersListContainer;
