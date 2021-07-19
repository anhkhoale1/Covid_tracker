import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';

function Summary({ report, selectedCountryID }) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if (selectedCountryID) {
            import (
                `@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`
            ).then((res) => 
                setMapData(res)
            );
        }
    }, [selectedCountryID]);

    return (
        <div style={{ marginTop: 10 }}>
            <Grid container spacing={3}>
                {/*1er grid on utilise linechart */}
                <Grid item sm={8} xs={12}>
                    <LineChart data={report}/>
                </Grid>
                {/*2erme grid on utilise highmaps */}
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Summary;