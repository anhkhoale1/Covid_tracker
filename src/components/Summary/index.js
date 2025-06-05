import React from 'react';
import { Grid } from '@mui/material';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';

function Summary({ report, selectedCountryID, mapData }) {
    return (
        <div style={{ marginTop: 10 }}>
            <Grid container spacing={3}>
                {/*1er grid on utilise linechart */}
                <Grid item sm={8} xs={12}>
                    <LineChart data={report}/>
                </Grid>
                {/*2erme grid on utilise highmaps */}
                <Grid item sm={4} xs={12}>
                    {mapData && <HighMaps mapData={mapData}/>}
                </Grid>
            </Grid>
        </div>
    );
}

export default Summary;