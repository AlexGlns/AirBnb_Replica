import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function AccountSettings() {
  let { user } = useContext(AuthContext);
  return (
    <div className="container">
      <h2 className="mb-2 py-3">Change User Info</h2>
      <div class="row">
        <div class="col-xs-12 col-sm-9">
          <form class="form-horizontal">
            <div className="card mb-3 ">
              <img src="" class="card-img-top" alt="user-image" />
              <div className="card-body">
                <h5 className="card-title">Current Info</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{"Username : " + user.username}</li>
                <li className="list-group-item">{"First Name : " + user.first_name}</li>
                <li className="list-group-item">{"Last Name : " + user.last_name}</li>
                <li className="list-group-item">{"Email : " + user.email}</li>
                <li className="list-group-item">{"Phone Number : " + user.phone_number}</li>
                <li className="list-group-item">{"User-Type : " + user.user_type}</li>
              </ul>
            </div>
            <div class="card mb-2">
              <div class="card-body">
                <h4 class="card-title">User info</h4>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Username</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-3">
              <div class="card-body">
                <h4 class="card-title">Contact info</h4>
                <div class="form-group">
                  <label class="col-sm-2 control-label">Phone number</label>
                  <div class="col-sm-10">
                    <input type="tel" class="form-control" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">E-mail address</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-2">
              <div className="card-body">
                <h4 className="card-title">Security</h4>

                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    Current password
                  </label>
                  <div className="col-sm-10">
                    <input type="password" class="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">New password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group m-2">
              <div className="col-sm-10 col-sm-offset-2">
                <button type="submit" className="btn btn-primary m-2">
                  Submit
                </button>
                <button type="reset" className="btn btn-primary m-2">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
