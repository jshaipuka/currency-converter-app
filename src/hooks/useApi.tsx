import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = ''
const KEY = ''

const serialize = (data: { 'Realtime Currency Exchange Rate': { ['5. Exchange Rate']: string } } | any): any => {
    return {
        exchangeRate: parseFloat(data.exchangeRates)
    }
}

const useApi = (initialQuery: { from: string, to: string, interval?: string }, initialData: { exchangeRate: 0 }): any => {
    const [data, setData] = useState(initialData)
    const [query, setQuery] = useState(initialQuery)
    const [isLoading, setIsLoading] = useState(false)

    const queryParams = new URLSearchParams(query as any)
    const url = `${BASE_URL}?${queryParams}`
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)

            try {
                const response = await axios(url, {
                    headers: {
                        'x-api-key': KEY,
                        'Content-Type': 'application/json'
                    }
                })
                setData(serialize(response.data))
            } catch (error) {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [url])

    return [{ data, isLoading, isError }, setQuery]
}

export default useApi