import React, { useEffect } from "react";

import {
  Map,
  Placemark,
  Clusterer,
} from '@pbe/react-yandex-maps';

const DEFAULT_MAP_ZOOM = 12;

const MapComponent = ({currentPosition, markList, handleMarkClick, ref, mapSize}) => {

  useEffect(() => {
    console.log(currentPosition, markList);
  }, [currentPosition, markList])
return (
  <Map
    instanceRef={ref}
    state={{
      center: currentPosition,
      zoom: DEFAULT_MAP_ZOOM,
      controls: ["zoomControl"],
    }}
    width="100%"
    height={mapSize}
    modules={["control.ZoomControl"]}
    onClick={(event) => {
      const coords = event.get("coords");
      console.log(coords);
    }}
  >
    <Clusterer
      options={{
        preset: "islands#invertedVioletClusterIcons",
        groupByCoordinates: false,
      }}>
      {
        markList.map((mark, i) => {
          return (
            <Placemark
              onClick={() => handleMarkClick(mark)}
              key={mark.id}
              defaultGeometry={[mark.geo1, mark.geo2]}
              options={{
                iconImageSize: [10, 10],
                preset: "islands#yellowDotIcon"
              }}
            />
          );
        })
      }
    </Clusterer>
  </Map>
)}

export default MapComponent;
