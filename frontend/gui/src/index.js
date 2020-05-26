import "./scss/index.css";
import $ from "jquery";
import render from "./jsx/render";

$(document).ready(() => {
  console.log("ready");
  render($("#root")[0]);
});
