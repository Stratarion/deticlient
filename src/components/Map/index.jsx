import React, { useEffect, useState } from "react";

import {
  Map,
  Placemark,
  Clusterer,
} from '@pbe/react-yandex-maps';
import { Spin } from "antd";

const DEFAULT_MAP_ZOOM = 12;

const MapComponent = ({ currentPosition, markList, handleMarkClick, mapRef, mapSize, ymaps }) => {
  console.log(markList[0]?.geo)
  console.log(markList)
  const [list, setList] = useState([]);

  useEffect(() => {
    markList.map(item => {
      ymaps?.geocode(item.address).then((res) => {
        const geo = res.geoObjects.get(0).geometry.getCoordinates();
        setList(prevItems => [...prevItems, { ...item, geo }])
      });
      return item
    })
  }, [markList, ymaps])

  if (!markList.length) {
    return (<Spin />)
  }

  return (
    <Map
      instanceRef={mapRef}
      state={{
        center: currentPosition,
        zoom: DEFAULT_MAP_ZOOM,
        controls: ["zoomControl"],
      }}
      width={"100%"}
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
          list?.map((mark, i) => {
            if (!mark.geo) return null;
            return (
              <Placemark
                onClick={() => handleMarkClick(mark)}
                key={mark.id}
                defaultGeometry={mark.geo}
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
  )
}

export default MapComponent;
