import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { useEffect, useState } from  'react';
import { getCountries, getReportByCountry, getMapDataByCountryId } from './components/apis';
import { sortBy } from 'lodash';
import { Container, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/fr';
import '@fontsource/roboto';

moment.locale('fr')

// Map of country codes to their Highcharts map codes
const countryCodeMap = {
  'fr': 'fr',
  'us': 'us',
  'gb': 'gb',
  'de': 'de',
  'it': 'it',
  'es': 'es',
  'cn': 'cn',
  'in': 'in',
  'br': 'br',
  'ru': 'ru',
  // Add more mappings as needed
};

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCountries()
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          // Filter out countries without historical data
          const validCountries = res.data.filter(country => 
            country.countryInfo && 
            country.countryInfo.iso2 && 
            country.country !== 'Diamond Princess' && 
            country.country !== 'MS Zaandam'
          );
          const countries = sortBy(validCountries, 'country');
          setCountries(countries);
          const france = countries.find(c => c.countryInfo?.iso2?.toLowerCase() === 'fr');
          if (france) {
            setSelectedCountryId(france.countryInfo.iso2.toLowerCase());
          }
        }
      })
      .catch(err => {
        console.error('Error fetching countries:', err);
        setError('Impossible de charger la liste des pays');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSelectedCountryId(value.toLowerCase());
    }
  };

  useEffect(() => {    
    if (selectedCountryID) {   
      const selectedCountry = countries.find(
        (country) => country?.countryInfo?.iso2?.toLowerCase() === selectedCountryID
      );

      if (selectedCountry) {
        setLoading(true);
        getReportByCountry(selectedCountry.country)
          .then((res) => {
            if (res.data && res.data.timeline) {
              const { cases, recovered: recoveredCases, deaths } = res.data.timeline;
              const reportData = Object.keys(cases).map(date => {
                // Parse the date string into a moment object with explicit format
                const dateObj = moment(date, 'YYYY-MM-DD');
                const confirmed = cases[date] || 0;
                const recoveredCount = recoveredCases[date] || 0;
                const deathsCount = deaths[date] || 0;
                
                return {
                  Date: dateObj.format('YYYY-MM-DD'),
                  Confirmed: confirmed,
                  Recovered: recoveredCount,
                  Deaths: deathsCount
                };
              });
              setReport(reportData);
              setError(null);
            }
          })
          .catch(err => {
            console.error('Error fetching country data:', err);
            setError(`Les données historiques ne sont pas disponibles pour ${selectedCountry.country}. Veuillez sélectionner un autre pays.`);
            setReport([]);
          })
          .finally(() => {
            setLoading(false);
          });

        // Get map data if available
        const mapCode = countryCodeMap[selectedCountryID];
        if (mapCode) {
          getMapDataByCountryId(mapCode)
            .then(res => {
              setMapData(res);
            })
            .catch(err => {
              console.error('Error loading map data:', err);
              setMapData(null);
            });
        } else {
          setMapData(null);
        }
      }
    }
  }, [countries, selectedCountryID])

  return (
    <Container style={{marginTop: 20}}>
      <Typography variant="h2" component="h2">
        Statistique de Covid-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      {error && (
        <Typography color="error" style={{ marginTop: 10, marginBottom: 10 }}>
          {error}
        </Typography>
      )}
      <CountrySelector 
        countries={countries} 
        handleOnChange={handleOnChange} 
        value={selectedCountryID}
      />
      {loading ? (
        <Typography>Chargement en cours...</Typography>
      ) : (
        <>
          <Highlight report={report}/>
          <Summary selectedCountryID={selectedCountryID} report={report} mapData={mapData}/>
        </>
      )}
    </Container>
  );
}

export default App;
