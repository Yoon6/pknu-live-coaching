import React from "react";
import {User} from "./User";

const UserContext = React.createContext(new User("unknown", ""));

export default UserContext;

