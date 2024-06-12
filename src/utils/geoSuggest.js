import { YA_GEO_SUGGEST_API } from "constants";


export const geoSuggest = async (value) => {
  const response = await fetch(`https://suggest-maps.yandex.ru/v1/suggest?text=${value}&print_address=1&apikey=${YA_GEO_SUGGEST_API}`);
  const body = await response.json();
  if (!body.results) {
    return [];
  };
  return body.results.map((point) => {
    return {
    label: point.title.text,
    value: point.address.formatted_address,
  }});
};
