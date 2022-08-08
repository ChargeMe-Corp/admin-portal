import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "./layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { auth } from "./firebase";
const Navigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("loading");
  const onAuthStateChanged = (user) => {
    if (!user) {
      return setIsLoggedIn(false);
    }
    return setIsLoggedIn(true);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
  }, []);
  if (isLoggedIn === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <Switch>
      {isLoggedIn ? (
        <Route path={`/admin`} component={AdminLayout} />
      ) : (
        <Route path={`/auth`} component={AuthLayout} />
      )}
      <Redirect from="/" to={isLoggedIn ? "/admin" : "/auth"} />
    </Switch>
  );
};
export default Navigator;
