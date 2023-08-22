import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateUser(props) {
  //const [userProfile, setUserProfile] = useState(null);
  console.log(props);

  axios
    .post(`http://127.0.0.1:8000/api/users/create/`, { props })
    .then((response) => {
      console.log(response);
    });

  // return (
  //     <div>
  //         <h2>User Profile</h2>
  //         {userProfile && (
  //             <div>
  //                 <p>Username: {userProfile.username}</p>
  //                 <p>Email: {userProfile.email}</p>
  //                 <p>User Type: {userProfile.user_type}</p>
  //                 {/* Add other profile details */}
  //             </div>
  //         )}
  //     </div>
  // );
}

export default CreateUser;
