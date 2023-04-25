import { Nft } from './types/types'

export const paginate = (
    items: Nft[],
    pageNumber: number,
    pageSize: number
): Nft[] => {
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize) // 0, 9
}
