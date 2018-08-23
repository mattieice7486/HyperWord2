
import React from "react";
import "./UserRow.css";

const UserRow = props => {
return (
    <tr>
        <td><span>{props.user.users}</span></td>
    </tr>
)
};

export default UserRow;