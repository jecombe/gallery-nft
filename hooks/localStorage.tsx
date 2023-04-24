import { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { LikeStorage } from '../types/types'

export const GetNfts = () => {
    const [nfts, setNfts] = useLocalStorageState<LikeStorage>('dataKey', {
        defaultValue: {},
    })

    useEffect(() => {
        const obj: LikeStorage = JSON.parse(
            localStorage.getItem('dataKey') || JSON.stringify({})
        )
        setNfts(obj)
    }, [])
    return {
        nfts,
    }
}

export const SetNfts = () => {
    const [data, setNfts] = useLocalStorageState<LikeStorage>('dataKey', {
        defaultValue: {},
    })

    const setData = (data: LikeStorage) => {
        setNfts(data)
    }

    useEffect(() => {
        let obj: LikeStorage = JSON.parse(
            localStorage.getItem('dataKey') || JSON.stringify({})
        )
        localStorage.setItem('dataKey', JSON.stringify(obj))
        setNfts(obj)
    }, [])
    return {
        data,
        setData,
    }
}
