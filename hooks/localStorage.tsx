import { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { LikeStorage } from '../utils/types'

export const GetNfts = () => {
    const [nftsStorage, setNfts] = useLocalStorageState<LikeStorage>(
        'dataKey',
        {
            defaultValue: {},
        }
    )

    useEffect(() => {
        const obj: LikeStorage = JSON.parse(
            localStorage.getItem('dataKey') || JSON.stringify({})
        )
        setNfts(obj)
    }, [])
    return {
        nftsStorage,
    }
}

export const SetNfts = () => {
    const [nftsStorage, setNfts] = useLocalStorageState<LikeStorage>(
        'dataKey',
        {
            defaultValue: {},
        }
    )

    const setData = (nftsStorage: LikeStorage) => {
        setNfts(nftsStorage)
    }

    useEffect(() => {
        let obj: LikeStorage = JSON.parse(
            localStorage.getItem('dataKey') || JSON.stringify({})
        )
        localStorage.setItem('dataKey', JSON.stringify(obj))
        setNfts(obj)
    }, [])
    return {
        nftsStorage,
        setData,
    }
}
