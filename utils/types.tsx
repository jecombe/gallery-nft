export interface Welcome {
  nfts: Nft[]
  nextToken: string
}

export interface Nfts {
  nfts: Nft[]
}

export interface Nft {
  contract: Contract
  id: ID
  title: string
  description: string
  tokenUri: TokenURI
  media: Media[]
  metadata: Metadata
  timeLastUpdated: Date
  contractMetadata: ContractMetadata
}

export interface Contract {
  address: Address
}

export enum Address {
  The0Xb003Ce92F3B2A8F3Dd99207C351Eaf05Bc605262 = "0xb003ce92f3b2a8f3dd99207c351eaf05bc605262",
}

export interface ContractMetadata {
  name: Name
  symbol: Symbol
  totalSupply: string
  tokenType: TokenType
  contractDeployer: ContractDeployer
  deployedBlockNumber: number
  openSea: OpenSea
}

export enum ContractDeployer {
  The0X4Ce199D9B671Dbcce60020773E5Ba5Ebb1677528 = "0x4ce199d9b671dbcce60020773e5ba5ebb1677528",
}

export enum Name {
  The20MintTypewriter = "20 Mint Typewriter",
}

export interface OpenSea {
  floorPrice: number
  collectionName: Name
  safelistRequestStatus: SafelistRequestStatus
  imageUrl: string
  description: string
  externalUrl: string
  lastIngestedAt: Date
}

export enum SafelistRequestStatus {
  NotRequested = "not_requested",
}

export enum Symbol {
  The20MT = "20MT",
}

export enum TokenType {
  Erc721 = "ERC721",
}

export interface ID {
  tokenId: string
  tokenMetadata: TokenMetadata
}

export interface TokenMetadata {
  tokenType: TokenType
}

export interface Media {
  gateway: string
  thumbnail: string
  raw: string
  format: Format
  bytes: number
}

export enum Format {
  PNG = "png",
}

export interface Metadata {
  name: string
  date: number
  description: string
  image: string
  edition: number
  attributes: Attribute[]
}

export interface Attribute {
  value: string
  trait_type: TraitType
}

export interface LikeStorage {
  [nft: string]: {
    addresses: Array<string>
    image: string
  } // 👈️ use string lowercase s
}

export enum TraitType {
  Background = "Background",
  Body = "Body",
  Carriage = "Carriage",
  FoodItem = "Food Item",
  Gift = "Gift",
  Glasses = "Glasses",
  Keyboard = "Keyboard",
  Logo20Mint = "Logo 20 Mint",
  LogoTernoa = "Logo Ternoa",
  Page = "Page",
  Pen = "Pen",
  Quote = "Quote",
  Stickers = "Stickers",
  TypeGuide = "Type Guide",
}

export interface TokenURI {
  gateway: string
  raw: string
}
