import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GamePicker from "./GamePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={GamePicker} />
      <Route path="/game/:gameId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
