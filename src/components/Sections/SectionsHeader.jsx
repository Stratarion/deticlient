import React from "react";
import { GridItem } from "uikit";
import { Grid } from "uikit";
import { InputWithLabel, Select } from "uikit";

const KinderGartenHeader = ({
  filterType,
  filterMax,
  value,
  changeTypeFilter,
  changeMaxFilter,
  changeValue,
  typeOptions,
  maxOptions,
}) => {
  return (
    <div className="kindergarten-header">
      <Grid rows="1fr 2fr" gap="10px 20px">
        <GridItem columns="1/13">
          <h2>Секции</h2>
        </GridItem>
        <GridItem columns="1/5">
          <Select
            topLabel={true}
            label="Тип секции"
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