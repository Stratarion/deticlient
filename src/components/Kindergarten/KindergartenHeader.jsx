import React, { useCallback } from "react";
import styled from "styled-components";
import { GridItem, Grid, InputWithLabel, Select, Button } from "uikit";

const StyledButtonLayout = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const KinderGartenHeader = ({
  filterType,
  filterMax,
  value,
  changeTypeFilter,
  changeMaxFilter,
  changeValue,
  typeOptions,
  maxOptions,
  applyFilters,
}) => {

  const handleApplyFilters = useCallback(() => {
    applyFilters();
  }, [applyFilters]);
  return (
    <div className="kindergarten-header">
      <Grid rows="1fr 2fr" gap="10px 20px">
        <GridItem columns="1/13">
          <h2>Детские Садики</h2>
        </GridItem>
        <GridItem columns="1/5">
          <Select
            topLabel={true}
            label="Тип Садика"
            value={filterType}
            onChange={changeTypeFilter}
            options={typeOptions.map(item => {return {value: item}})}
          ></Select>
        </GridItem>
        <GridItem columns="5/9">
          <Select
            topLabel={true}
            label="Максимальная численость группы"
            value={filterMax}
            onChange={changeMaxFilter}
            options={maxOptions.map(item => {return {value: item}})}
          ></Select>
        </GridItem>
        <GridItem>
          <InputWithLabel
            type="text"
            label="Поиск по названию"
            value={value}
            onInput={(e) => changeValue(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <StyledButtonLayout>
            <Button onClick={handleApplyFilters}>Применить</Button>
          </StyledButtonLayout>
        </GridItem>
      </Grid>
      <div className="kindergatern-tags">
        <div className="kindergatern-tags-item"></div>
        <div className="kindergatern-tags-item"></div>
        <div className="kindergatern-tags-item"></div>
      </div>
    </div>
  )
}

export default KinderGartenHeader;