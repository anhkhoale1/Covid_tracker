import React from 'react';
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,
}));

function CountrySelector({ value, handleOnChange, countries }) {
    return (
        <StyledFormControl>
            <InputLabel htmlFor='country-selector' shrink>
                Pays
            </InputLabel>
            <NativeSelect
                value={value || ''}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {countries && countries.map((country) => {
                    if (!country || !country.countryInfo || !country.countryInfo.iso2) return null;
                    return (
                        <option key={country.countryInfo.iso2} value={country.countryInfo.iso2.toLowerCase()}>
                            {country.country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText>Choissiez un pays</FormHelperText>
        </StyledFormControl>
    );
}

export default CountrySelector;