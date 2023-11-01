import React, { useState } from "react";
import { ReactComponent as MarkerLayerIcon } from "./assets/hide.svg";
import { ReactComponent as CloudLayerIcon } from "./assets/cloud.svg";

type LayerControlProps = {
  mapRef: any;
  setMarkerVisibility: (value: boolean) => void;
  setPredictionVisibility: (value: boolean) => void;
};

const LayerControls = (props: LayerControlProps) => {
  const [markersVisible, setMarkersVisible] = useState<boolean>(true);
  const [predictionsVisible, setPredictionsVisible] = useState<boolean>(true);

  const toggleMarkerVisibility = () => {
    props.setMarkerVisibility(!markersVisible);
    setMarkersVisible(!markersVisible);
  };
  const togglePredictionVisibility = () => {
    props.setPredictionVisibility(!predictionsVisible);
    setPredictionsVisible(!predictionsVisible);
  };

  return (
    <div className="absolute bottom-8 left-8 h-24 w-12 z-6000">
      <button className={"h-12 w-12"} onClick={toggleMarkerVisibility}>
        <MarkerLayerIcon
          className={`h-12 w-12	${
            markersVisible ? "opacity-80 visible" : "opacity-30 "
          }
					transition-all duration-250`}
        />
      </button>
      <button className={"h-12 w-12"} onClick={togglePredictionVisibility}>
        <CloudLayerIcon
          className={`h-12 w-12	${
            predictionsVisible ? "opacity-80 visible" : "opacity-30 "
          }
					transition-all duration-250`}
        />
      </button>
    </div>
  );
};

export default LayerControls;
