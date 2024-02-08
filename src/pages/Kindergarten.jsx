// main sources
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { YMaps } from '@pbe/react-yandex-maps';

// comsponents
import KinderGartenHeader from 'components/Kindergarten/KindergartenHeader';
import Header from 'components/Header';
import { Stars } from 'components/Stars';
import MapComponent from 'components/Map';
import { Grid } from 'uikit';

// additional sources 
import { GartenInfo } from 'components/Kindergarten/GartenInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getGartenList, destroyGartens } from 'actions/gartens';
import { usePosition } from 'hooks/usePosition';
import { GridItem, Button, List } from 'uikit';

// TODO вынести фильтры и их консты
const typeOptions = [
  'Любой',
  'Частный',
  'Государственный'
];

const maxOptions = [
  "Не важно",
  10,
  20,
  30,
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const API_KEY = "9737ccb0-8cb9-40ab-8c73-1b47265f4082";
const COORD_CENTER = [45.073913, 39.040065];
const DEFAULT_MAP_SIZE = "60vh";
const LOW_HAIGHT_MAP = "20vh";

function Kindergarten() {
  const query = useQuery();

  const { position: userPosition } = usePosition(COORD_CENTER);

  const [ filterType, setFilterType ] = useState(typeOptions[0]);
  const [ filterMax, setFilterMax ] = useState(maxOptions[0]);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [mapSize, setMapSize] = useState(DEFAULT_MAP_SIZE);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(query.get('page') || 1);

  const { isLoading, gartens: gartensList } = useSelector((state) => state.gartens);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    (async () => {
      try {
        if (value) {
          const res = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}`
          );
          console.log(res);

        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [value]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    dispatch(getGartenList(page))
  }, [page, dispatch, isLoading])
  
  // FILTERS
  const changeTypeFilter = useCallback((value) => {
    setFilterType((value));
  }, []);

  const changeMaxFilter = useCallback((value) => {
    setFilterMax((value));
  }, []);

  // GETTERS
  const getCurrentPlaceInfo = useCallback(() => {
    return gartensList.find((item) => item.id === currentPlace);
  }, [currentPlace, gartensList])

  // HANDLERS
  const handleMarkClick = useCallback((garten) => {
    setCurrentPlace(garten.id);
    setMapSize(LOW_HAIGHT_MAP);
  }, []);

  const handleDestroyGartens = useCallback(() => {
    dispatch(destroyGartens())
  }, [dispatch]);
  
  const handleBackButton = useCallback(() => {
    setCurrentPlace(null);
    setMapSize(DEFAULT_MAP_SIZE);
  }, []);

  const handleAddButton = useCallback(() => {
    navigate("/kindergarten/create")
  }, [navigate])

  const coordForMap = useMemo(() => {
    return getCurrentPlaceInfo()
    ? [getCurrentPlaceInfo()?.geo1, getCurrentPlaceInfo()?.geo2]
    : userPosition

  }, [getCurrentPlaceInfo, userPosition])
  
  return (
    <YMaps
      query={{
        apikey: API_KEY
      }}
    >
      <div className='kindergarten'>
        <Header />
        {
          currentPlace ?
            <h2>{getCurrentPlaceInfo().name}</h2>
            :
            <Grid row="1fr 2fr">
              <GridItem columns="1/3" >
                <Button onClick={handleAddButton}>Добавить заведение</Button>
              </GridItem>
              <GridItem columns="3/5">
                <Button onClick={handleDestroyGartens}>Удалить все</Button>
              </GridItem>
              <GridItem columns="1/13" rows="2/3">
                <KinderGartenHeader
                  filterType={filterType}
                  filterMax={filterMax}
                  value={value}
                  changeValue={setValue}
                  changeTypeFilter={changeTypeFilter}
                  changeMaxFilter={changeMaxFilter}
                  typeOptions={typeOptions}
                  maxOptions={maxOptions}
                />
              </GridItem>
            </Grid>
        }
        
        <MapComponent
          currentPosition={coordForMap}
          markList={gartensList}
          handleMarkClick={handleMarkClick}
          ref={ref}
          mapSize={mapSize}
        />

        {currentPlace ? (
          <>
            <Button
              onClick={handleBackButton}
            >Назад</Button>
            <GartenInfo garten={getCurrentPlaceInfo()} />
          </>
        ) : (
          <List>
            {gartensList.map((garten) => {
              return (
                <li key={garten.id} className="kindergarten-item">
                  <div className="kindergarten-item-title" onClick={() => handleMarkClick(garten)}>{garten.name}</div>
                  <div className="kindergarten-item-max">{garten.maxConut}</div>
                  {garten.costInfo && <div className="kindergarten-item-cost">Цена: {garten.costInfo}</div>}
                  <div className="kindergarten-item-stars">
                    <Stars value={garten.rate} edit={false} />
                  </div>
                  <div className="kindergarten-item-desription">
                    {garten.description}
                  </div>
                  <div className="kindergarten-item-marks"></div>
                </li>
              )
            })}
            {isLoading && "Загрузка..."}
            {gartensList?.lenght}
            Номер страницы {page}
            <button onClick={() => setPage(page+1)} >еще</button>
          </List>
        )}
        
        
      </div>
    </YMaps>
  )
};

export default Kindergarten;