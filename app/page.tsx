import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, TrendingUp, Star, Eye, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge variant="secondary" className="mb-4">
                Powered by OneLabs Blockchain
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Tokenize Your
                <span className="text-primary block">Anime Collection</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Transform your physical anime merchandise into verified NFTs. Trade, collect, and showcase your favorite
                figures, cards, and collectibles on the blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/create">
                    Start Tokenizing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Anime merchandise collection"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                  NFT Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12,500+</div>
              <div className="text-muted-foreground">NFTs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3,200+</div>
              <div className="text-muted-foreground">Active Collectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">850 OCT</div>
              <div className="text-muted-foreground">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Authenticity Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover rare and exclusive anime merchandise NFTs from top collectors and creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNFTs.map((nft, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className="absolute top-3 left-3"
                    variant={nft.rarity === "legendary" ? "default" : "secondary"}
                  >
                    {nft.rarity}
                  </Badge>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {nft.views}
                    </div>
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {nft.likes}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{nft.name}</CardTitle>
                  <CardDescription>{nft.series}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Price</div>
                      <div className="text-lg font-bold text-primary">{nft.price} OCT</div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/marketplace">
                View All Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AnimeVault?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted platform for anime merchandise tokenization with cutting-edge blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Tokenize Your Collection?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of collectors who have already transformed their anime merchandise into valuable NFTs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/create">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Star className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">AnimeVault</span>
              </div>
              <p className="text-muted-foreground">
                The premier platform for anime merchandise tokenization and NFT trading.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/marketplace" className="hover:text-foreground">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-foreground">
                    Tokenize
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-foreground">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-foreground">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AnimeVault. All rights reserved. Powered by OneLabs Blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const featuredNFTs = [
  {
    name: "Demon Slayer Tanjiro Figure",
    series: "Demon Slayer",
    image: "/placeholder.svg?height=300&width=300",
    price: "12.5",
    rarity: "rare",
    views: "1.2k",
    likes: "89",
  },
  {
    name: "Attack on Titan Survey Corps Badge",
    series: "Attack on Titan",
    image: "/placeholder.svg?height=300&width=300",
    price: "8.3",
    rarity: "uncommon",
    views: "856",
    likes: "67",
  },
  {
    name: "One Piece Luffy Gold Card",
    series: "One Piece",
    image: "/placeholder.svg?height=300&width=300",
    price: "25.0",
    rarity: "legendary",
    views: "2.1k",
    likes: "156",
  },
]

const features = [
  {
    icon: Shield,
    title: "Verified Authenticity",
    description: "Every item is verified through our rigorous authentication process before tokenization.",
  },
  {
    icon: Zap,
    title: "Instant Trading",
    description: "Buy, sell, and trade your anime NFTs instantly with our lightning-fast blockchain technology.",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with anime collectors and enthusiasts from around the world in our vibrant marketplace.",
  },
  {
    icon: TrendingUp,
    title: "Investment Tracking",
    description: "Monitor your collection's value and track market trends with our advanced analytics tools.",
  },
  {
    icon: Star,
    title: "Rarity System",
    description: "Our sophisticated rarity system ensures fair valuation based on item scarcity and demand.",
  },
  {
    icon: Eye,
    title: "Transparent History",
    description: "Complete ownership and transaction history for every NFT, ensuring full transparency.",
  },
]
