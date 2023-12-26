import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Component/Header/header";
import Content from "./Component/Content/content";
import Footer from "./Component/Footer/footer";
import LoadingPage from "./Component/Loading_Page/loading_page";
import ErrorPage from "./Component/ErrorPage/ErrorPage";

function App(props) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentLocationLongitudeLatitude, setCurrentLocation] = useState();
  const [errorRes, setErrorRes] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const liveCoordinates = position.coords;
      setCurrentLocation(liveCoordinates);
      setLoadingPage(false);
    });
  }, []);

  return (
    <>
      <div className="App">
        {loadingPage ? (
          <LoadingPage />
        ) : (
          <Content
            currentLocationLongitudeLatitude={currentLocationLongitudeLatitude}
          />
        )}
      </div>
    </>
  );
}

export default App;
