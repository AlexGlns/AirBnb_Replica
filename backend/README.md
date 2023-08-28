# AirBnb_Replica

Use the backend into a react frontend

1. install axios
2. how to use the paths (example):

####################################################
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile(props) {
    const [userProfile, setUserProfile] = useState(null);
    const userId = 1; // Replace with the actual user ID

    useEffect(() => {
        axios.get(`http://your-backend-domain.com/api/users/${userId}/`)
            .then(response => {
                setUserProfile(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {userProfile && (
                <div>
                    <p>Username: {userProfile.username}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>User Type: {userProfile.user_type}</p>
                    {/* Add other profile details */}
                </div>
            )}
        </div>
    );
}

export default UserProfile;
###################################################

3. paths you can use:
	1. user create 
    2. user info
	3. property create
	4. property info
	5. reservation create
	6. reservation info

for further info on each path you can check /backend/backend_app/models.py to see which fields are required for each path

4. to run the server locally
    1. clone the code
        # Navigate to your project directory
        cd path/to/your/project

        # Create a virtual environment
        python -m venv venv
    2. source venv/bin/activate
    3. python manage.py makemigrations
        python manage.py migrate
    4. python manage.py createsuperuser
    5. python manage.py runserver

After the server is running locally you can create requests from the frontend to the backend




