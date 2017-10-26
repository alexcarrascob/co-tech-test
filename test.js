'use strict';

// This class is used for logins
class Login {
  constructor(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
      this.users = this.users.concat([e.k]);
      this.passwords = this.passwords.concat([e.v]);
    });
  }
  
  // User logout
  logout(user) {
    this.sessions.forEach((session, i) => {
      if (session === user) {
        this.sessions[i] = null;
      }
    });
    this.sessions = this.sessions.filter(session => session !== null);
  }

  // Checks if user exists
  userExists(user) {
    // Temp variable for storing the user if found
    let temp = '';
    for (let i of this.users) {
      if (i === user) {
        temp = user;
      }
    }
    let exists = (temp !== '' && temp === user);
    return exists;
  }

  // Register user
  registerUser(user, password) {
    let lastIndex = this.users.length;
    this.users[lastIndex] = user;
    this.passwords[lastIndex] = password;
  }

  // Remove user
  removeUser(user) {
    let index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
  }

  // Check password for a user
  checkPassword(user, password) {
    let index = this.idx(user, this.users);
    let passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
  }

  // Update password for a user with a new value
  updatePassword(user, oldPassword, newPassword) {
    // First, we check if the user exists.
    if (userExists(user)) {
      // Then, we check the password of the user with the value of 'oldPassword'.
		if (checkPassword(user, oldPassword)) {
			// Finally, if the above conditions are met then we set the new password to the value of 'newPassword'
			// and return true.
			this.passwords[index] = newPassword;
			return true;
      }
    }
	// If none of the above conditions is met, then we return false.
    return false;
  }

  // User login
  login(user, password) {
	// First, we check if the user exists.
    if (userExists(user)) {
		// Then, we check the password of the user with the value of 'password'.
		if (checkPassword(user, password)) {
			// Finally, if the above conditions are met then we add a new session for the user 'user'.
			this.sessions.push(user);
		}
    }
  }

  // Gets index of an element in an array
  idx(element, array) {
    let cont=0;
    for (let i of array) {
      if (i === element) {
        return cont;
      }
      cont += 1;
    }
    return cont;
  }
}


// Start of execution of the main program
let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');
// End of execution of the main program
