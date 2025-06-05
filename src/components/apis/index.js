import axios from 'axios';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const getCountries = () =>
    axios.get(`${BASE_URL}/countries`);

export const getReportByCountry = (country) =>
    axios.get(`${BASE_URL}/historical/${country}?lastdays=all`);

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);