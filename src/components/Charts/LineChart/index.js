import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
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
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
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
            <ButtonGroup size='small' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')}>Tous</Button>
                <Button color={reportType === '30days' ? 'secondary' : ''} onClick={() => setReportType('30days')}>30 jours</Button>
                <Button color={reportType === '7days' ? 'secondary' : ''} onClick={() => setReportType('7days')}>7 jours</Button>
            </ButtonGroup>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default React.memo(LineChart);