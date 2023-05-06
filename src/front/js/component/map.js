import React, { useContext, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Context } from "../store/appContext";
import Geocode from "react-geocode";

export const Map = ({
  newPost,
  from_location,
  to_location,
  setFrom,
  setTo,
}) => {
  const { store } = useContext(Context);

  const [latitude, setLat] = useState(0);
  const [longitude, setLng] = useState(0);
  const [name, setName] = useState("");
  const [click_country, setClick_country] = useState("");
  const [first_city, setFirst_city] = useState(false);
  const [both_cities, setBoth_cities] = useState(false);
  const containerStyle = { width: "500px", height: "500px" };

  const selected_country = store.countries.countries.filter(
    (e) => e.id == newPost.country
  );

  const country_center = {
    lat: selected_country[0].latitude,
    lng: selected_country[0].longitude,
  };

  const pointer = {
    lat: latitude,
    lng: longitude,
  };

  const from_to = [
    {
      lat: newPost.from_location.latitude,
      lng: newPost.from_location.longitude,
    },
    {
      lat: newPost.to_location.latitude,
      lng: newPost.to_location.longitude,
    },
  ];

  const lineOptions = {
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "blue",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  function getPlace(e) {
    // if (!both_cities) {
    Geocode.setApiKey("AIzaSyBWSuXSmKxPovMm6sx3qjinwNyJ10wDg8U");
    setLat(e.latLng.lat());
    setLng(e.latLng.lng());

    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      (response) => {
        const plus_code_address = response.plus_code.compound_code;
        const split_address = plus_code_address.split(" ");
        split_address.shift();
        setClick_country(split_address.pop());
        setName(split_address.join(" ").replace(",", ""));
      },
      (error) => {
        console.error(error);
      }
    );
    // }
  }

  return (
    <div className="d-flex justify-content-center">
      <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={country_center}
          zoom={6}
          onClick={(e) => getPlace(e)}
        >
          <>
            {pointer.lat ? (
              <Marker position={pointer} />
            ) : (
              <Marker position={country_center} />
            )}
            {first_city && <Marker position={from_to[0]} />}
            {/* {both_cities && <Marker position={from_to[1]} /> } */}
            {both_cities &&
              ((<Marker position={from_to[1]} />),
              (<Polyline path={from_to} options={lineOptions} />))}
          </>
        </GoogleMap>
        <div>
          {!first_city && (
            <div className="p-3">
              <h2>From:</h2>
              {pointer.lat ? (
                <p>
                  {name} , {click_country}
                </p>
              ) : (
                <p>* Select city from the map</p>
              )}
              <button
                type="button"
                className="bnt btn-dark mp-1 ms-2"
                onClick={() => {
                  const from_location = {
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    country: click_country,
                  };
                  setFrom(from_location);
                  setFirst_city(true);
                }}
              >
                Ok
              </button>
            </div>
          )}
          {first_city && !both_cities && (
            <>
              <h2>From:</h2>
              <p>
                {newPost.from_location.name}, {newPost.from_location.country}
              </p>
              <h2>To:</h2>
              {pointer.lat ? (
                <p>
                  {name} , {click_country}
                </p>
              ) : (
                <p>* Select city from the map</p>
              )}
              <button
                type="button"
                className="bnt btn-dark mp-1 ms-2"
                onClick={() => {
                  const to_location = {
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    country: click_country,
                  };
                  setTo(to_location);
                  setBoth_cities(true);
                }}
              >
                Ok
              </button>
            </>
          )}
        </div>
      </LoadScript>
    </div>
  );
};

export default Map;
