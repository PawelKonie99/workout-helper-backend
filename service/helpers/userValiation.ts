export const checkPasswordLenght = (password: string): boolean => {
  if (password.length > 3) {
    return true;
  } else {
    return false;
  }
};
