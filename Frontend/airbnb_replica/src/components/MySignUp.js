import React from "react";

function MySignUp() {
  return (
    <div className="container rounded bg-light mt-5 py-1">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group py-1">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>

        <div class="row">
          <div class="col-md-6 mb-1 py-1">
            <div class="form-outline">
              <label class="form-label" for="form3Examplev2">
                First name
              </label>

              <input
                type="text"
                id="form3Examplev2"
                class="form-control form-control-lg"
              />
            </div>
          </div>
          <div class="col-md-6 mb-1 py-1">
            <div class="form-outline">
              <label class="form-label" for="form3Examplev3">
                Last name
              </label>

              <input
                type="text"
                id="form3Examplev3"
                class="form-control form-control-lg"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>

        <div class="form-froup py-2">
          <label class="form-label" for="phoneNumber">
            Phone Number
          </label>
          <input type="tel" id="phoneNumber" class="form-control" />
        </div>

        <div class="form-check form-check-inline py-1">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label class="form-check-label" for="inlineCheckbox1">
            Οικοδεσπότης
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
          <label class="form-check-label" for="inlineCheckbox2">
            Ενοικιαστής
          </label>
        </div>

        <div class="d-flex flex-row align-items-center mb-2">
          <i class="fas fa-lock fa-lg fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
          <label class="form-label" for="form3Example4c">
              Password
            </label>
            <input type="password" id="form3Example4c" class="form-control" />

          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-2">
          <i class="fas fa-key fa-lg fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
          <label class="form-label" for="form3Example4cd">
              Repeat your password
            </label>
            <input type="password" id="form3Example4cd" class="form-control" />

          </div>
        </div>

        <button type="submit" className="btn btn-primary m-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default MySignUp;
