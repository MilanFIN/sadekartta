import React, { useState } from "react";

type MapControlProps = {
  mapRef: any;
  updateAcceptedRainValue: (value: number) => void;
  updatePredictionDistance: (value: number) => void;
};

const MapControls = (props: MapControlProps) => {
  const [acceptedLimit, setAcceptedLimit] = useState<number>(0.2);
  const [predictionDistance, setPredictionDistance] = useState<number>(1);

  const addZoom = () => {
    const map = props.mapRef.current;

    let zoom = map.setView(map.getCenter(), map.getZoom() + 1);
  };
  const subZoom = () => {
    const map = props.mapRef.current;

    let zoom = map.setView(map.getCenter(), map.getZoom() + -1);
  };

  const changeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedLimit(parseFloat(event.target.value));
    props.updateAcceptedRainValue(parseFloat(event.target.value));
  };

  const changePredictionDistance = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPredictionDistance(parseFloat(event.target.value));
    props.updatePredictionDistance(parseFloat(event.target.value));
  };

  return (
    <div className="absolute bottom-8 right-8 w-44 h-48 z-6000 border-4 border-black bg-black bg-opacity-50 pt-1">
      <button
        className={
          "mr-1 w-20 h-16 text-2xl text-white bg-black opacity-50 hover:opacity-70"
        }
        onClick={subZoom}
      >
        -
      </button>
      <button
        className={
          "w-20 h-16 text-2xl text-white bg-black opacity-50 hover:opacity-70"
        }
        onClick={addZoom}
      >
        +
      </button>

      <label className="w-full h-8 text-white">
        Sademäärä &lt; {acceptedLimit}
      </label>
      <br />
      <input
        type="range"
        min={0.0}
        max={3.0}
        className="w-full h-8 "
        id="acceptedRange"
        step={0.1}
        onChange={changeLimit}
        value={acceptedLimit}
      ></input>

      <label className="w-full h-8 text-white">
        Ennuste (h): {predictionDistance}
      </label>
      <br />
      <input
        type="range"
        min={1}
        max={3}
        className="w-full h-8 "
        id="predictionDistance"
        step={1}
        onChange={changePredictionDistance}
        value={predictionDistance}
      ></input>
    </div>
  );
};

export default MapControls;
