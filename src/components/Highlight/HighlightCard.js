import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CountUp from 'react-countup';

const StyledCard = styled(Card)(({ theme, type }) => ({
    borderLeft: type === 'confirmed' ? '5px solid #c9302c' : 
                type === 'recovered' ? '5px solid #28a745' : 
                '5px solid gray'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&.title': {
        fontSize: 18,
        marginBottom: 5,
    },
    '&.count': {
        fontWeight: 'bold',
        fontSize: 18,
    }
}));

function HighlightCard({ title, count, type }) {
    return (
        <StyledCard type={type}>
            <CardContent>
                <StyledTypography component='p' variant='body2' className="title">
                    {title}
                </StyledTypography>
                <StyledTypography component='span' variant='body2' className="count">
                    <CountUp end={count || 0} duration={2} separator=' ' />
                </StyledTypography>
            </CardContent>
        </StyledCard>
    );
}

export default HighlightCard;