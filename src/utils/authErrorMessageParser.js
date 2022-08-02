export default errorMessage => {
  switch (errorMessage) {
    case 'auth/invalid-email':
      return 'Invalid Email Address';
    case 'auth/invalid-password':
      return 'Invalid Password';
    case 'auth/email-already-exists':
      return 'Email Already Exists';
    case 'auth/email-already-in-use':
      return 'Email Already In Use';
    case 'auth/wrong-password':
      return 'Wrong Password';
    case 'auth/weak-password':
      return 'Weak Password';
    default:
      return errorMessage;
  }
};
