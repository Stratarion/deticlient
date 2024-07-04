// main sources
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useYMaps } from '@pbe/react-yandex-maps';

// comsponents
import KinderGartenHeader from 'components/Kindergarten/KindergartenHeader';
import MapComponent from 'components/Map';
import { Grid } from 'uikit';

// additional sources 
import { GartenInfo } from 'components/Kindergarten/GartenInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getGartenList, destroyGartens } from 'actions/gartens';
import { usePosition } from 'hooks/usePosition';
import { GridItem, Button, List } from 'uikit';
import { MainLayout } from 'layouts';
import { YA_KEY_API } from 'constants';

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
const COORD_CENTER = [45.073913, 39.040065];
const DEFAULT_MAP_SIZE = "60vh";
const LOW_HAIGHT_MAP = "20vh";

function Kindergarten() {
  const query = useQuery();
  const ymaps = useYMaps(['Map', 'geocode']);

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
            `https://geocode-maps.yandex.ru/1.x/?apikey=${YA_KEY_API}&format=json&geocode=${value}`
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
  }, [currentPlace, gartensList]);

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
    ? getCurrentPlaceInfo()?.geo
    : userPosition

  }, [getCurrentPlaceInfo, userPosition])
  
  return (
    <MainLayout>
        <div className='kindergarten'>
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
            mapRef={ref}
            mapSize={mapSize}
            ymaps={ymaps}
          />

          {currentPlace ? (
            <>
              <Button
                onClick={handleBackButton}
              >Назад</Button>
              <GartenInfo garten={getCurrentPlaceInfo()} />
            </>
          ) : (
            <List
              data={gartensList}
              page={page}
              setPage={setPage}
              mtop="20px"
              handleTitleClick={handleMarkClick}
            />
          )}
          
          
        </div>
    </MainLayout>
  )
};

export default Kindergarten;