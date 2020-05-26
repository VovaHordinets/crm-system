import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <ul className="buttons">
      <li onClick={() => props.display_page('login')}>login</li>
      <li onClick={() => props.display_page('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul className="log_out-menu">
      <li className="log_out-btn" onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_page: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};