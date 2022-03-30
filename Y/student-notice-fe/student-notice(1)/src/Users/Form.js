import React, { useState } from "react";

import SignIn from "./signIn";
import AddUser from "./AddUser";

const Form = () => {
  const [isLogIn, setIsLogIn] = useState(false);
console.log("inform");
  const formManipulate = () => {
    setIsLogIn(!isLogIn);
  };

  return (
    <div>
      {isLogIn && <SignIn formManipulate={formManipulate} />}
      {!isLogIn && <AddUser formManipulate={formManipulate} />}
    </div>
  );
};

export default Form;
