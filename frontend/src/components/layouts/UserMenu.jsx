import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <NavLink
            to="/dashboard/user"
            className=""
            style={{ textDecoration: "none" }}
          >
            <h4>User Panel</h4>
          </NavLink>
          <NavLink
            to="/dashboard/user/my-profile"
            className="list-group-item list-group-item-action"
          >
            My Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/my-orders"
            className="list-group-item list-group-item-action"
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
