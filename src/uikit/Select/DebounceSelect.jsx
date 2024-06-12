import React, { useMemo, useRef, useState } from "react";
import { AutoComplete, Spin } from "antd";
import { debounce } from "lodash";
import { LabelStyled, WrapStyled } from "./Select.styled";

export const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, label, topLabel = false }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <WrapStyled>
        {topLabel && <LabelStyled>{label}</LabelStyled>}
        <AutoComplete
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          options={options}
        />
      </WrapStyled>
    );
  }