import { useEffect, useState } from 'react'
import { Nft } from '../utils/types'

export const GetApi = () => {
    const [nfts, setUserList] = useState<Nft[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [page, setPage] = useState<number>(1)

    const setPages = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        const getUserList = () => {
            setLoading(true)
            fetch(
                `https://eth-mainnet.g.alchemy.com/nft/v2/I3Yjrcvtv7fRyyShkDifeoIGKl-Z6pwc/getNFTsForCollection?contractAddress=0xb003ce92f3b2a8f3dd99207c351eaf05bc605262&withMetadata=true&startToken=${page}&limit=10`
            )
                .then((res) => res.json())
                .then((res) => {
                    setUserList([...nfts, ...res.nfts])
                    setTotalPages(nfts.length)
                    setLoading(false)
                })
        }
        getUserList()
    }, [page])
    return {
        nfts,
        loading,
        totalPages,
        page,
        setPages,
    }
}
