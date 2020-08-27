import React, { FC, useState } from 'react'
import 'bulma/css/bulma.min.css'

import ExchangeRatesForm from './components/ExchangeRatesForm'
import Chart from './components/CandleStickChart'
import useApi from './hooks/useApi'
import useHistoryApi from './hooks/useApiHistory'

const App: FC = () => {
    const [exchangePair, setExchangePair] = useState({ from: 'USD', to: 'EUR' })
    const [exchangeAmount, setExchangeAmount] = useState(0)
    const [interval, setInterval] = useState('monthly')


    const [{ data, isLoading, isError }, fetchRates] = useApi(
        { from: exchangePair.from, to: exchangePair.to },
        { exchangeRate: 0 }
    )

    const [{ historyData }, fetchHistory] = useHistoryApi(
        { from: exchangePair.from, to: exchangePair.to, interval },
        []
    )

    const exchange: (data: { from: string, to: string, amount: number }) => void = ({ from, to, amount }) => {
        setExchangePair({ from, to })
        setExchangeAmount(amount)
        fetchRates({ from, to })
    }

    const pickCandleStickChartInterval: (interval: string) => void = (interval) => {
        setInterval(interval)
        fetchHistory({ ...exchangePair, interval })
    }

    return (
        <body>
        <section className="hero is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Currency Exchange
                    </h1>
                    <h2 className="subtitle">
                        Please use form below to see current exchange rate for selected currencies and the stock graph
                    </h2>
                    <div className="container">
                        <div className="notification">
                            <div>
                                <ExchangeRatesForm amount={1} from={exchangePair.from} to={exchangePair.to}
                                                   onSubmit={exchange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {
            !!exchangeAmount && !!data.exchangeRate &&
            <section className="section">
                <div className="container">

                    <h1 className="title">Exchange rate</h1>
                    <div>
                        <p className="is-size-4-widescreen has-text-dark has-text-centered has-text-weight-medium">{`${exchangeAmount} ${exchangePair.from} = ${exchangeAmount * data.exchangeRate} ${exchangePair.to} at rate ${data.exchangeRate}`}</p>
                    </div>

                </div>
            </section>
        }
        {
            !!exchangeAmount && !!data.exchangeRate &&
            <section className="section">
                <div className="container">
                    <h1 className="title">Stock graph</h1>
                    <h2 className="subtitle">
                        See the latest open, high,low & close bids.
                    </h2>
                    <div style={{ width: '80%'}}>
                        <Chart data={historyData} interval={interval} title={'Latest data'}
                               onSelectInterval={pickCandleStickChartInterval}/>
                    </div>
                </div>
            </section>
        }
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    See code at <a href="https://github.com/jshaipuka">Github</a>.
                </p>
            </div>
        </footer>
        </body>
    )
}

export default App
