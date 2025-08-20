"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, Filter, Grid3X3, List, Heart, Eye, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import type { AnimeNFT } from "@/lib/types"

// Mock data for marketplace NFTs
const mockNFTs: AnimeNFT[] = [
  {
    id: "1",
    name: "Demon Slayer Tanjiro Figure",
    description: "Premium quality Tanjiro Kamado figure from the hit anime series Demon Slayer",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Tanjiro+Figure",
    category: "figure",
    rarity: "rare",
    creator: "0x1234...5678",
    owner: "0x8765...4321",
    price: 12.5,
    isListed: true,
    createdAt: "2024-01-15",
    attributes: {
      series: "Demon Slayer",
      character: "Tanjiro Kamado",
      manufacturer: "Good Smile Company",
      releaseYear: 2023,
      condition: "mint",
    },
  },
  {
    id: "2",
    name: "Attack on Titan Survey Corps Badge",
    description: "Official Survey Corps badge replica from Attack on Titan",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Survey+Corps+Badge",
    category: "accessory",
    rarity: "uncommon",
    creator: "0x2345...6789",
    owner: "0x9876...5432",
    price: 8.3,
    isListed: true,
    createdAt: "2024-01-14",
    attributes: {
      series: "Attack on Titan",
      character: "Survey Corps",
      manufacturer: "Crunchyroll Store",
      releaseYear: 2022,
      condition: "near-mint",
    },
  },
  {
    id: "3",
    name: "One Piece Luffy Gold Card",
    description: "Ultra rare holographic Monkey D. Luffy trading card",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Luffy+Gold+Card",
    category: "card",
    rarity: "legendary",
    creator: "0x3456...7890",
    owner: "0x0987...6543",
    price: 25.0,
    isListed: true,
    createdAt: "2024-01-13",
    attributes: {
      series: "One Piece",
      character: "Monkey D. Luffy",
      manufacturer: "Bandai",
      releaseYear: 2024,
      condition: "mint",
    },
  },
  {
    id: "4",
    name: "Naruto Hokage Poster",
    description: "Limited edition poster featuring all Hokage from Naruto series",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Hokage+Poster",
    category: "poster",
    rarity: "epic",
    creator: "0x4567...8901",
    owner: "0x1098...7654",
    price: 15.8,
    isListed: true,
    createdAt: "2024-01-12",
    attributes: {
      series: "Naruto",
      character: "All Hokage",
      manufacturer: "Viz Media",
      releaseYear: 2023,
      condition: "mint",
    },
  },
  {
    id: "5",
    name: "My Hero Academia Deku Nendoroid",
    description: "Adorable Deku Nendoroid with multiple expressions and accessories",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Deku+Nendoroid",
    category: "figure",
    rarity: "rare",
    creator: "0x5678...9012",
    owner: "0x2109...8765",
    price: 18.2,
    isListed: true,
    createdAt: "2024-01-11",
    attributes: {
      series: "My Hero Academia",
      character: "Izuku Midoriya",
      manufacturer: "Good Smile Company",
      releaseYear: 2023,
      condition: "mint",
    },
  },
  {
    id: "6",
    name: "Dragon Ball Z Goku Keychain",
    description: "Collectible Goku keychain from Dragon Ball Z series",
    imageUrl: "/placeholder.svg?height=400&width=400&text=Goku+Keychain",
    category: "accessory",
    rarity: "common",
    creator: "0x6789...0123",
    owner: "0x3210...9876",
    price: 4.5,
    isListed: true,
    createdAt: "2024-01-10",
    attributes: {
      series: "Dragon Ball Z",
      character: "Son Goku",
      manufacturer: "Toei Animation",
      releaseYear: 2022,
      condition: "good",
    },
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["figure", "card", "poster", "accessory", "other"]
  const rarities = ["common", "uncommon", "rare", "epic", "legendary"]

  const filteredAndSortedNFTs = useMemo(() => {
    const filtered = mockNFTs.filter((nft) => {
      const matchesSearch =
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.attributes.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.attributes.character.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(nft.category)
      const matchesRarity = selectedRarities.length === 0 || selectedRarities.includes(nft.rarity)
      const matchesPrice = nft.price && nft.price >= priceRange[0] && nft.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesRarity && matchesPrice
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategories, selectedRarities, priceRange, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleRarityChange = (rarity: string, checked: boolean) => {
    if (checked) {
      setSelectedRarities([...selectedRarities, rarity])
    } else {
      setSelectedRarities(selectedRarities.filter((r) => r !== rarity))
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "epic":
        return "bg-gradient-to-r from-purple-400 to-pink-500"
      case "rare":
        return "bg-gradient-to-r from-blue-400 to-cyan-500"
      case "uncommon":
        return "bg-gradient-to-r from-green-400 to-emerald-500"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Anime NFT Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, collect, and trade verified anime merchandise NFTs from collectors worldwide
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anime NFTs, series, or characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categories */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Category</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                          />
                          <Label htmlFor={category} className="text-sm capitalize cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rarity */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Rarity</Label>
                    <div className="space-y-2">
                      {rarities.map((rarity) => (
                        <div key={rarity} className="flex items-center space-x-2">
                          <Checkbox
                            id={rarity}
                            checked={selectedRarities.includes(rarity)}
                            onCheckedChange={(checked) => handleRarityChange(rarity, checked as boolean)}
                          />
                          <Label htmlFor={rarity} className="text-sm capitalize cursor-pointer">
                            {rarity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Price Range: {priceRange[0]} - {priceRange[1]} OCT
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedRarities([])
                      setPriceRange([0, 100])
                      setSearchQuery("")
                    }}
                    className="w-full bg-transparent"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* NFT Grid/List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredAndSortedNFTs.length} NFT{filteredAndSortedNFTs.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedNFTs.map((nft) => (
                  <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={nft.imageUrl || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className={`absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-medium ${getRarityColor(nft.rarity)}`}
                      >
                        {nft.rarity.toUpperCase()}
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full">
                          <Eye className="h-3 w-3" />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-1">{nft.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{nft.attributes.series}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {nft.category}
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Current Price</div>
                          <div className="text-lg font-bold text-primary">{nft.price} OCT</div>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/marketplace/${nft.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedNFTs.map((nft) => (
                  <Card key={nft.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={nft.imageUrl || "/placeholder.svg"}
                            alt={nft.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div
                            className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-white text-xs font-medium ${getRarityColor(nft.rarity)}`}
                          >
                            {nft.rarity.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{nft.name}</h3>
                              <p className="text-muted-foreground">{nft.attributes.series}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Price</div>
                              <div className="text-xl font-bold text-primary">{nft.price} OCT</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{nft.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{nft.category}</Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(nft.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Button asChild>
                              <Link href={`/marketplace/${nft.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredAndSortedNFTs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No NFTs Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                    setSelectedRarities([])
                    setPriceRange([0, 100])
                  }}
                  className="bg-transparent"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
