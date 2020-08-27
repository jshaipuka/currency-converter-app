import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

interface IExchangeRatesFormProps {
    amount: number
    from: string
    to: string
    onSubmit: (data: { from: string, to: string, amount: number }) => void
}

const ExchangeRatesForm: FC<IExchangeRatesFormProps> = ({ amount, from, to, onSubmit }) => {
    const { register, handleSubmit } = useForm()
    const currencies: string[] = ['USD', 'EUR', 'GBP']

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field-body">
                <div className="field">
                    <p className="control"
                       style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div
                            className="is-size-4-widescreen has-text-dark has-text-centered has-text-weight-medium">Convert
                        </div>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <input className="input is-medium" name="amount" type="number" step="1" ref={register}
                               defaultValue={amount} required/>
                    </p>
                </div>
                <div className="field">
                    <p className="control"
                       style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div
                            className="is-size-4-widescreen has-text-dark has-text-centered has-text-weight-medium">From
                        </div>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <select className="select is-medium is-fullwidth" name="from" defaultValue={from}
                                ref={register}>
                            {currencies.map(option => (<option key={option} value={option}>{option}</option>))}
                        </select>
                    </p>
                </div>
                <div className="field">
                    <p className="control"
                       style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div
                            className="is-size-4-widescreen has-text-dark has-text-centered has-text-weight-medium">To
                        </div>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <select className="select is-medium is-fullwidth" name="to" defaultValue={to} ref={register}>
                            {currencies.map(option => (<option key={option} value={option}>{option}</option>))}
                        </select>
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <input className="button is-medium is-dark" type="submit"/>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default ExchangeRatesForm