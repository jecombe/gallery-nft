export const getElement = (
    array: Array<string>,
    element: string | undefined
): string | undefined => {
    return array.find((el) => el === element)
}

export const addElement = (array: Array<string>, element: string) => {
    array.push(element)
}

export const getIndex = (array: Array<string>, element: string): number => {
    return array.indexOf(element)
}

export const deleteElement = (array: Array<string>, index: number) => {
    array.splice(index, 1)
}

export const parseSrc = (path: string): string => {
    return `http://ipfs.io/ipfs/${path.split('//')[1]}`
}
