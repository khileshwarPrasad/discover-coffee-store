import React, { useState, useContext } from "react";
import { ACTION_TYPE, Storecontext } from "../store/confeeStore";

const usegeoLocation = () => {
  const [erroMsg, setError] = useState("");
  // const [latLog, setlatLog] = useState("");
  const [isFindingLocation, setFindingLocation] = useState(false);
  const { dispatch } = useContext(Storecontext);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setlatLog(`${latitude},-${longitude}`);
    dispatch({
      type: ACTION_TYPE.SET_LAT_LONG,
      payload: { latLog: `${latitude},-${longitude}` },
    });
    setError("");
    setFindingLocation(false);
  }
  const error = () => {
    setFindingLocation(false);
    setError("Unbale to Retriveve Your Loaction");
  };
  const handleTrackLocation = () => {
    setFindingLocation(true);
    if (!navigator.geolocation) {
      setFindingLocation(false);
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    erroMsg,
    // latLog,
    handleTrackLocation,
    isFindingLocation,
  };
};

export default usegeoLocation;
