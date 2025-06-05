import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@mui/material';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

// Initialize accessibility module
HighchartsAccessibility(Highcharts);

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date, 'YYYY-MM-DD').format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
    },
    accessibility: {
      enabled: true,
      description: 'Graphique montrant le nombre de cas confirmés de COVID-19',
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return 'Nouveau point de données: ' + newPoint.y + ' cas le ' + newPoint.category;
          }
          return false;
        }
      }
    },
    title: {
      text: 'Nombre d\'infectés',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} cas</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Nombre d\'infectés',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
}

  const LineChart = ({ data }) => {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState('all');

    useEffect(() => {
        let customData = [];
        switch (reportType) {
            case 'all':
                customData = data;
                break;
            case '30days':
                customData = data.slice(data.length - 30);
                break;
            case '7days':
                customData = data.slice(data.length - 7);
                break;
            default:
                customData = data;
                break;
        }
        setOptions(generateOptions(customData));
    }, [data, reportType]);

    return (
        <div>
            <ButtonGroup size='small' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant={reportType === 'all' ? 'contained' : 'outlined'} 
                    onClick={() => setReportType('all')}
                >
                    Tous
                </Button>
                <Button 
                    variant={reportType === '30days' ? 'contained' : 'outlined'} 
                    onClick={() => setReportType('30days')}
                >
                    30 jours
                </Button>
                <Button 
                    variant={reportType === '7days' ? 'contained' : 'outlined'} 
                    onClick={() => setReportType('7days')}
                >
                    7 jours
                </Button>
            </ButtonGroup>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default React.memo(LineChart);