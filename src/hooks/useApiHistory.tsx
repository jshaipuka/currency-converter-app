import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = ''
const KEY = ''

const serialize = (data: any): any => {
    const timeSeries = Object.keys(data)
    return timeSeries.map(date => {
        const stockData = data[date]
        return {
            x: new Date(date),
            y: [stockData.open, stockData.high, stockData.low, stockData.close]
        }
    })
}

const useHistoryApi = (initialQuery: { from: string, to: string, interval: string }, initialData: any): any => {
    const [historyData, setData] = useState(initialData)
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
                setData(serialize(response.data as any))
            } catch (error) {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [url])

    return [{ historyData, isLoading, isError }, setQuery]
}

export default useHistoryApi