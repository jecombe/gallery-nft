import styles from '../styles/Home.module.css'
import { MediaRenderer, useSDK } from '@thirdweb-dev/react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { useAddress } from '@thirdweb-dev/react'
import { Nfts, Attribute, Nft, LikeStorage } from '../utils/types'
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
import { paginate } from '../utils/paginate'

const Collections = ({ nfts }: Nfts) => {
    //Hooks & States
    const address: string | undefined = useAddress()
    const [signature, setSignature] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { nftsStorage, setData } = SetNfts()
    //Globals
    const sdk = useSDK()
    const message: string = 'NFT GALLERY !'
    const pageSize: number = 10

    //pagination
    const paginatedPosts = paginate(nfts, currentPage, pageSize)
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const createNftStorage = (
        data: LikeStorage,
        nft: string,
        addr: string,
        image: string
    ) => {
        data[nft] = {
            addresses: [addr],
            image,
        }
    }

    const deleteLike = (nft: string, getAddress: string) => {
        deleteElement(
            nftsStorage[nft].addresses,
            getIndex(nftsStorage[nft].addresses, getAddress)
        ) // delete like from array
        if (nftsStorage[nft].addresses.length === 0) {
            // if array of addresses is empty, delete nft from object storage
            delete nftsStorage[nft]
        }
    }

    const manageLike = (
        nft: string,
        addr: string | undefined,
        image: string
    ) => {
        if (!addr || !signature) {
            return alert(
                'You need to connect your wallet OR sign before use like button'
            )
        }
        if (!nftsStorage[nft]) {
            // if nft don't exist inside storage, create object with address who liked
            createNftStorage(nftsStorage, nft, addr, image)
        } else if (nftsStorage[nft]) {
            //if tokenErc721 exist
            const getAddress = getElement(nftsStorage[nft].addresses, addr)
            // if address of user don't exist add this on array of addresses
            if (!getAddress) addElement(nftsStorage[nft].addresses, addr)
            else {
                // else delete address of user from array of addresses
                deleteLike(nft, getAddress)
            }
        }
        //set all update to local storage and hooks
        setData(nftsStorage)
        localStorage.setItem('dataKey', JSON.stringify(nftsStorage))
    }

    const signMessage = async () => {
        try {
            const sig = await sdk?.wallet.sign(message) //use thirdweb SDK to sing message
            if (!sig) {
                throw new Error('"No signature')
            }
            setSignature(sig)
        } catch (error) {
            throw new Error(`signMessage error ${error}`)
        }
    }

    const getNftLikeStorage = (
        nft: string,
        addr: string | undefined
    ): string | undefined => {
        if (!nftsStorage || !nftsStorage[nft]) return undefined

        return getElement(nftsStorage[nft].addresses, addr)
    }

    const renderLike = (name: string) => {
        //if getNftLikeStorage can't found address of user return emptyHeart button
        return (
            <>
                {getNftLikeStorage(name, address) ? (
                    <AiFillHeart fontSize="25px" />
                ) : (
                    <AiOutlineHeart fontSize="25px" />
                )}
            </>
        )
    }
    const renderNft = ({ metadata }: Nft) => {
        //manage nft storage, add like into storage, delete like and render that
        const parseImage: string = parseSrc(metadata.image)

        return (
            <>
                <MediaRenderer src={metadata.image} />

                <button
                    onClick={() =>
                        manageLike(metadata.name, address, parseImage)
                    }
                >
                    {renderLike(metadata.name)}
                </button>
            </>
        )
    }

    const renderNfts = () => {
        //browse all nfts with pagination receive from alchemy
        return paginatedPosts.map((nft: Nft, id: number) => {
            return (
                <div className={styles.card} key={id}>
                    {renderNft(nft)}

                    <h2 className={styles.titleNft}>{nft.metadata.name}</h2>
                    {nft.metadata.attributes.map(
                        // browse attribute of nft
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
            <p className={styles.description}>All NFTs on collection 20Mint</p>
            <div className={styles.signature}>
                {signature ? (
                    <h3>Welcome {address} !</h3>
                ) : (
                    <>
                        <p className={styles.alertSign}>
                            [!] you need to signate before like nft [!]
                        </p>
                        <button
                            className={styles.btnSign}
                            onClick={signMessage}
                        >
                            Sign Me !
                        </button>
                    </>
                )}
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
