import React from 'react';
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
    }
}));

function CountrySelector( { value, handleOnChange, countries }) {
    const style = useStyle();

    return (
    <FormControl className={style.formControl}>
        <InputLabel htmlFor='country-selector' shrink>
            Pays
        </InputLabel>
        <NativeSelect
            value={value}
            onChange={handleOnChange}
            inputProps={{
                name: 'country',
                id: 'country-selector',
            }}
        >
            {countries.map((country) => {
                return (
                    <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                        {country.Country}
                    </option>
                );
            })}
        </NativeSelect>
        <FormHelperText>Choissiez un pays</FormHelperText>
    </FormControl>
    );
}

export default CountrySelector;