import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const NewPost = () => {
  const { store } = useContext(Context);
  const countries = store.countries.countries;
  console.log(countries);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [from_location, setFrom_location] = useState("");
  const [to_location, setTo_location] = useState("");
  const [trip_duration, setTrip_Duration] = useState("");
  const [price, setPrice] = useState("");
  const [transports, setTransports] = useState([]);
  const [description, setDescription] = useState("");

  const newPost = {
    title: title,
    country: country,
    from_location: from_location,
    to_location: to_location,
    trip_duration: trip_duration,
    price: price,
    transports: transports,
    description: description,
  };

  async function post() {
    console.log(transports);
    const response = await fetch(process.env.BACKEND_URL + "/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      console.log("success");
    }
    console.log(title);
    console.log(country);
    console.log(from_location);
    console.log(to_location);
    console.log(trip_duration);
    console.log(price);
    console.log(description);
    console.log(newPost);
  }

  return (
    <div className="text-center">
      <div className="border-botto_locationm p-3 ">
        <h3>Create new post</h3>
      </div>
      <div className="bg-light border-botto_locationm p-3">
        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-5">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              className="form-control"
              type="text"
              placeholder="My amazing trip!"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="validation"></div>
          </div>
          <div className="col-md-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              id="country"
              className="form-select"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option selected disabled defaultValue="">
                Select a country
              </option>
              {countries &&
                countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
            <div className="validation"></div>
          </div>
        </div>

        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-4">
            <label className="form-label">From_location:</label>
            <select
              className="form-select"
              onChange={(e) => setFrom_location(e.target.value)}
            >
              <option selected disabled value="">
                Pick a city
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <div className="validation"></div>
          </div>
          <div className="col-md-4">
            <label className="form-label">To_location:</label>
            <select
              className="form-select"
              onChange={(e) => setTo_location(e.target.value)}
            >
              <option selected disabled value="">
                Pick a city
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <div className="validation"></div>
          </div>
        </div>

        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-2">
            <label className="form-label">Trip trip_duration</label>
            <div className="input-group">
              <span className="input-group-text">hh:mm</span>
              <input
                type="test"
                className="form-control"
                onChange={(e) => setTrip_Duration(e.target.value)}
              />
            </div>
            <div className="validation"></div>
          </div>
          <div className="col-md-2">
            <label className="form-label">Price</label>
            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                type="test"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="validation"></div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Transports</label>
            <div className="cards d-flex justify-content-center">
              <div className="rectangle rounded bg-secondary p-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="car"
                    onChange={(e) =>
                      setTransports([...transports, e.target.value])
                    }
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <i className="fa-solid fa-car"></i>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="bus"
                    onChange={(e) =>
                      setTransports([...transports, e.target.value])
                    }
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <i className="fa-solid fa-bus-simple"></i>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="train"
                    onChange={(e) =>
                      setTransports([...transports, e.target.value])
                    }
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    <i className="fa-solid fa-train"></i>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="bicycle"
                    onChange={(e) =>
                      setTransports([...transports, e.target.value])
                    }
                  />
                  <label
                    className="form-check-label p-0"
                    htmlFor="inlineRadio4"
                  >
                    <i className="fa-solid fa-bicycle"></i>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="walking"
                    onChange={(e) =>
                      setTransports([...transports, e.target.value])
                    }
                  />
                  <label
                    className="form-check-label p-0"
                    htmlFor="inlineRadio4"
                  >
                    <i className="fa-solid fa-person-walking"></i>
                  </label>
                </div>
              </div>
            </div>
            <div className="validation"></div>
          </div>
        </div>

        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-8 justify-content-end">
            <label htmlFor="message" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end p-2">
        <div className="col-1">
          <button className="btn btn-secondary" type="reset">
            Cancel
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => post()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
