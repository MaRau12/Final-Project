import React, { useContext, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker, Polyline } from "@react-google-maps/api";

import Geocode from "react-geocode";

import { Context } from "../store/appContext";

export const Map = ({ newPost, setFrom, setTo }) => {
  const { store } = useContext(Context);

  const [newLocation, setNewLocation] = useState({
    name: "*Select city from map",
    latitude: 0,
    longitude: 0,
    country: store.countries.filter((e) => e.name == newPost.country)[0],
    isFirst: true,
    editing: true,
  });

  const pointers = [
    {
      center: {
        lat: store.countries.filter((e) => e.id == newPost.country)[0].latitude,
        lng: store.countries.filter((e) => e.id == newPost.country)[0]
          .longitude,
      },
    },
    {
      pointer: {
        lat: newLocation.latitude,
        lng: newLocation.longitude,
      },
    },
    {
      path: [
        {
          lat: newPost.from_location.latitude,
          lng: newPost.from_location.longitude,
        },
        {
          lat: newPost.to_location.latitude,
          lng: newPost.to_location.longitude,
        },
      ],
    },
  ];

  const mapStyle = {
    containerStyle: { width: "500px", height: "500px" },
    lineOptions: {
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
    },
  };

  function getPlace(e) {
    if (newLocation.editing) {
      Geocode.setApiKey("AIzaSyBWSuXSmKxPovMm6sx3qjinwNyJ10wDg8U");

      Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
        (response) => {
          const plus_code_address = response.plus_code.compound_code;

          if (!plus_code_address) {
            setNewLocation({
              ...newLocation,
              name: "get closer to pick a city",
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
              country: newPost.country,
            });
          } else {
            // let country = plus_code_address.split(",")[0];
            // console.log(plus_code_address);
            // console.log("country", country);

            // let result = plus_code_address.substring(
            //   0,
            //   plus_code_address.indexOf(",")
            // );
            // console.log(result);
            let split_address = plus_code_address.split(" ");
            split_address.shift();

            setNewLocation({
              ...newLocation,
              name: split_address.join(" ").replace(",", ""),
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
              country: split_address.pop(),
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyle.containerStyle}
          center={pointers[0].center}
          zoom={6}
          onClick={(e) => getPlace(e)}
        >
          {newLocation.editing ? (
            <>
              {newLocation.latitude == 0 && (
                <Marker position={pointers[0].center} />
              )}
              {pointers[1].pointer.lat && (
                <Marker position={pointers[1].pointer} />
              )}
              {pointers[2].path[0].lat && (
                <Marker position={pointers[2].path[0]} />
              )}
              {pointers[2].path[1].lat && (
                <Marker position={pointers[2].path[1]} />
              )}
            </>
          ) : (
            <>
              <Marker position={pointers[2].path[0]} />
              <Marker position={pointers[2].path[1]} />
              <Polyline
                path={pointers[2].path}
                options={mapStyle.lineOptions}
              />
            </>
          )}
        </GoogleMap>

        <div>
          {newLocation.editing && (
            <div className="p-3">
              {newLocation.isFirst ? (
                <div className="">
                  <h2>From:</h2>
                  <div>
                    <p>{newLocation.name}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2>From:</h2>
                  <p>{newPost.from_location.name}</p>
                  <h2>To:</h2>
                  <p>{newLocation.name}</p>
                </div>
              )}
              {newLocation.name != "*Select city from map" &&
                newLocation.name != "get closer to pick a city" && (
                  <button
                    type="button"
                    className="raise mp-1 ms-2"
                    onClick={
                      newLocation.isFirst
                        ? () => {
                            setFrom(newLocation);
                            setNewLocation({
                              ...newLocation,
                              name: "*Select city from map",
                              country: store.countries.filter(
                                (e) => e.id == newPost.country
                              )[0],
                              isFirst: false,
                            });
                          }
                        : () => {
                            setTo(newLocation);
                            setNewLocation({
                              ...newLocation,
                              editing: false,
                            });
                          }
                    }
                  >
                    Ok
                  </button>
                )}
            </div>
          )}
        </div>
      </LoadScript>
    </div>
  );
};

export default Map;
