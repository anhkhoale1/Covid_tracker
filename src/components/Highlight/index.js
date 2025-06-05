import React from 'react';
import { Grid } from '@mui/material';
import HighlightCard from './HighlightCard';

function Highlight({ report }) {
    const data = report && report.length  ? report[report.length - 1] : [];

    const summary = [
        {
            title: 'Confirmés',
            count: data.Confirmed,
            type: 'confirmed',
        },
        {
            title: 'Rétablis',
            count: data.Recovered,
            type: 'recovered',
        },
        {
            title: 'Décès',
            count: data.Deaths,
            type: 'death',
        },
    ]

    return (
        <Grid container spacing={3}>
            {summary.map((item) => (
                <Grid item sm={4} xs={12} key={item.type}>
                    <HighlightCard
                        title={item.title} 
                        count={item.count} 
                        type={item.type}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default Highlight;