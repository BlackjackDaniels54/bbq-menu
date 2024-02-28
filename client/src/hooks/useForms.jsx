import { useState } from "react";


const initialUserData = { username: '', password: '' };

const useForm = () => {
  const [isPassVisible, setPassVisible] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const handleInteractionStart = (e) => {
    e.preventDefault();
    setPassVisible(true);
  };

  const handleInteractionEnd = (e) => {
    e.preventDefault();
    setPassVisible(false);
  };

  const changeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setUserData(initialUserData);
  };

  return {
    isPassVisible,
    userData,
    handleInteractionStart,
    handleInteractionEnd,
    changeUserData,
    resetForm,
  };
};

export default useForm;
