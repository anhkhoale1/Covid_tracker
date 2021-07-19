import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { useEffect, useState } from  'react';
import { getCountries, getReportByCountry } from './components/apis';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fr';
import '@fontsource/roboto';

moment.locale('fr')

function App() {
  //State countries sauvegarde les données transférées par api.
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  //depuis covid19api, prendre la liste des pays
  useEffect(() => {
    getCountries().then(res => {
      console.log({ res });

      const countries = sortBy(res.data, 'Country')

      setCountries(countries);

      setSelectedCountryId('fr');
    });
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {    
    if (selectedCountryID) {   
      const selectedCountry = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryID
      );

      getReportByCountry(selectedCountry.Slug).then((res) => {
        //enlever donnees de la date currente car elle n'est pas encrore finie
        res.data.pop();
        setReport(res.data)
      });
    }
  }, [countries, selectedCountryID])

  return (
    <Container style={{marginTop: 20}}>
      <Typography variant="h2" component="h2">
        Statistique de Covid-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID}/>
      <Highlight report={report}/>
      <Summary selectedCountryID={selectedCountryID} report={report}/>
    </Container>
  );
}

export default App;
