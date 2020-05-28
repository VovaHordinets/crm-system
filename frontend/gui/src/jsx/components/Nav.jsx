import React from "react";
import PropTypes from "prop-types";
import "../../scss/Auth.css";

function Nav(props) {
  const logged_out_nav = (
    <ul className="buttons">
      <li className="btn" onClick={() => props.display_page("login")}>
        <h1>login</h1>
      </li>
      <li className="btn" onClick={() => props.display_page("signup")}>
        <h1>signup</h1>
      </li>
    </ul>
  );

  const logged_in_nav = (
    <ul className="log_out-menu">
      <li className="btn" onClick={props.handle_logout}>
        <h1>logout</h1>
      </li>
    </ul>
  );
  return <div className="header_user_name" >{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_page: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired,
};
