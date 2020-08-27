import Chart from 'react-apexcharts'

import React, { FC } from 'react'
import dayjs from 'dayjs'

interface ICandleStickChart {
    data: []
    interval: string
    title: string
    onSelectInterval: (interval: string) => void
}

const CandleStickChart: FC<ICandleStickChart> = ({ data, interval, title, onSelectInterval }) => {
    const options = {
        chart: {
            width: '400px',
            type: 'candlestick'
        },
        title: {
            text: title,
            align: 'left'
        },
        tooltip: {
            enabled: true
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (val: any) {
                    if (interval == 'monthly') {
                        return dayjs(val).format('DD.MM')
                    }
                    return dayjs(val).format('DD.MM HH:mm')
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }

    return (
        <div>
            <div className="field is-grouped">
                <button className={'button is-small ' + (interval == 'daily' ? 'is-dark' : 'is-white')}
                        onClick={() => onSelectInterval('daily')}>
                    daily
                </button>
                <button className={'button is-small ' + (interval == 'weekly' ? 'is-dark' : 'is-white')}
                        onClick={() => onSelectInterval('weekly')}>
                    weekly
                </button>
                <button className={'button is-small ' + (interval == 'monthly' ? 'is-dark' : 'is-white')}
                        onClick={() => onSelectInterval('monthly')}>
                    monthly
                </button>
            </div>
            <Chart options={options} series={[{ name: 'candle', data: data }]} type="candlestick"/>
        </div>
    )
}

export default CandleStickChart