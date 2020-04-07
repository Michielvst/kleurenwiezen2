import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GamePicker from "./GamePicker";
import AppFunction from "./AppFunction.js";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={GamePicker} />
      <Route path="/game/:gameId" component={AppFunction} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
