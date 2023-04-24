import styles from '../styles/Home.module.css'
import {
    ConnectWallet,
    MediaRenderer,
    ThirdwebNftMedia,
    useSDK,
} from '@thirdweb-dev/react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { useAddress } from '@thirdweb-dev/react'
import { Nfts, Attribute, Nft } from '../types/types'
import { SetNfts } from '../hooks/localStorage'
import {
    addElement,
    deleteElement,
    getElement,
    getIndex,
    parseSrc,
} from '../utils/utils'
import { useState } from 'react'
import Pagination from './Pagination'
import { paginate } from '../paginate'

const Collections = ({ nfts }: Nfts) => {
    const address: string | undefined = useAddress()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize: number = 10
    const { data, setData } = SetNfts()
    const sdk = useSDK()
    const message: string = 'please sign me !'

    const paginatedPosts = paginate(nfts, currentPage, pageSize)

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const manageLike = (
        nft: string,
        addr: string | undefined,
        image: string
    ) => {
        if (!addr) return

        if (!data[nft]) data[nft] = { addresses: [addr], image }
        else if (data[nft]) {
            const getAddress = getElement(data[nft].addresses, addr)
            if (!getAddress) addElement(data[nft].addresses, addr)
            else {
                deleteElement(
                    data[nft].addresses,
                    getIndex(data[nft].addresses, getAddress)
                )
                if (data[nft].addresses.length === 0) {
                    delete data[nft]
                }
            }
        }
        setData(data)
        localStorage.setItem('dataKey', JSON.stringify(data))
    }

    const getNftLikeStorage = (nft: string, addr: string | undefined) => {
        if (!data || !data[nft]) return false

        const isFound = data[nft].addresses.find((el) => el === addr)

        return isFound
    }

    const signMessage = async () => {
        const sig = await sdk?.wallet.sign(message)
        if (!sig) {
            throw new Error('"No signature')
        }
    }

    const renderNft = ({ metadata }: Nft) => {
        const parseImage: string = parseSrc(metadata.image)

        return (
            <>
                <MediaRenderer src={metadata.image} />

                <button
                    onClick={() =>
                        manageLike(metadata.name, address, parseImage)
                    }
                >
                    {getNftLikeStorage(metadata.name, address) ? (
                        <AiFillHeart fontSize="25px" />
                    ) : (
                        <AiOutlineHeart fontSize="25px" />
                    )}
                </button>
            </>
        )
    }

    const renderNfts = () => {
        return paginatedPosts.map((nft: Nft, id: number) => {
            return (
                <div className={styles.card} key={id}>
                    {renderNft(nft)}

                    <h2 className={styles.titleNft}>{nft.metadata.name}</h2>
                    {nft.metadata.attributes.map(
                        (e: Attribute, index: number) => (
                            <li className={styles.list} key={index}>
                                {' '}
                                <a className={styles.attributeKey}>
                                    {e.trait_type}:{' '}
                                </a>
                                <a className={styles.attribute}>{e.value} </a>
                            </li>
                        )
                    )}
                </div>
            )
        })
    }

    return (
        <>
            <h1 className={styles.title}>NFT GALLERY!</h1>
            <div>
                <button className={styles.signMe} onClick={signMessage}>
                    Sign Me !
                </button>
            </div>

            <div className={styles.cards}>{renderNfts()}</div>

            <Pagination
                items={nfts.length} // 100
                currentPage={currentPage} // 1
                pageSize={pageSize} // 10
                onPageChange={onPageChange}
            />
        </>
    )
}

export default Collections