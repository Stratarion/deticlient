import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { YMaps } from '@pbe/react-yandex-maps';

// comsponents
import SectionsHeader from 'components/Sections/SectionsHeader';
import MapComponent from 'components/Map';
import { Grid } from 'uikit';

// additional sources 
import { SectionInfo } from 'components/Sections/SectionInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getSectionsList, destroySections } from 'actions/sections';
import { usePosition } from 'hooks/usePosition';
import { GridItem, Button, List } from 'uikit';
import { MainLayout } from 'layouts';
import { YA_KEY_API } from 'constants';

// TODO вынести фильтры и их консты
const typeOptions = [
  'Спортивные',
  'Творческие',
  'Рзавитие'
];

const maxOptions = [
  "Не важно",
  10,
  20,
  30,
];
const COORD_CENTER = [45.073913, 39.040065];
const DEFAULT_MAP_SIZE = "60vh";
const LOW_HAIGHT_MAP = "20vh";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Sections() {
  const query = useQuery();

  const { position: userPosition } = usePosition(COORD_CENTER);

  const [ filterType, setFilterType ] = useState(typeOptions[0]);
  const [ filterMax, setFilterMax ] = useState(maxOptions[0]);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [mapSize, setMapSize] = useState(DEFAULT_MAP_SIZE);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(query.get('page') || 1);

  const { isLoading, sections: sectonsList } = useSelector((state) => state.sections);

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
    dispatch(getSectionsList(page))
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
    return sectonsList.find((item) => item.id === currentPlace);
  }, [currentPlace, sectonsList])

  // HANDLERS
  const handleMarkClick = useCallback((section) => {
    setCurrentPlace(section.id);
    setMapSize(LOW_HAIGHT_MAP);
  }, []);

  const handleDestroySections = useCallback(() => {
    dispatch(destroySections())
  }, [dispatch]);
  
  const handleBackButton = useCallback(() => {
    setCurrentPlace(null);
    setMapSize(DEFAULT_MAP_SIZE);
  }, []);

  const handleAddButton = useCallback(() => {
    navigate("/sections/create")
  }, [navigate])

  const coordForMap = useMemo(() => {
    return getCurrentPlaceInfo()
    ? getCurrentPlaceInfo()?.geo
    : userPosition

  }, [getCurrentPlaceInfo, userPosition])
  
  return (
    <MainLayout>
      <YMaps
        query={{
          apikey: YA_KEY_API
        }}
      >
        <div className='sections'>
          {
            currentPlace ?
              <h2>{getCurrentPlaceInfo().name}</h2>
              :
              <Grid row="1fr 2fr">
                <GridItem columns="1/3" >
                  <Button onClick={handleAddButton}>Добавить заведение</Button>
                </GridItem>
                <GridItem columns="3/5">
                  <Button onClick={handleDestroySections}>Удалить все</Button>
                </GridItem>
                <GridItem columns="1/13" rows="2/3">
                  <SectionsHeader
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
            markList={sectonsList}
            handleMarkClick={handleMarkClick}
            mapRef={ref}
            mapSize={mapSize}
          />

          {currentPlace ? (
            <>
              <Button
                onClick={handleBackButton}
              >Назад</Button>
              <SectionInfo section={getCurrentPlaceInfo()} />
            </>
          ) : (
            <List
              data={sectonsList}
              page={page}
              setPage={setPage}
              mtop="20px"
              handleTitleClick={handleMarkClick}
            />
          )}
          
          
        </div>
      </YMaps>
    </MainLayout>
  )
};

export default Sections