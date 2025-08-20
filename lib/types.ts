export interface AnimeNFT {
  id: string
  name: string
  description: string
  imageUrl: string
  category: "figure" | "card" | "poster" | "accessory" | "other"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  creator: string
  owner: string
  price?: number
  isListed: boolean
  createdAt: string
  attributes: {
    series: string
    character: string
    manufacturer?: string
    releaseYear?: number
    condition?: string
  }
}

export interface MarketplaceListing {
  id: string
  nftId: string
  seller: string
  price: number
  currency: "OCT" | "SUI"
  listedAt: string
  status: "active" | "sold" | "cancelled"
}

export interface User {
  address: string
  username?: string
  avatar?: string
  joinedAt: string
  nftsOwned: number
  nftsSold: number
  totalVolume: number
}

export interface TokenizationRequest {
  itemName: string
  description: string
  category: AnimeNFT["category"]
  rarity: AnimeNFT["rarity"]
  images: File[]
  attributes: {
    series: string
    character: string
    manufacturer?: string
    releaseYear?: number
    condition?: string
  }
  physicalVerification: {
    photos: File[]
    certificates?: File[]
    provenanceDocuments?: File[]
  }
}
