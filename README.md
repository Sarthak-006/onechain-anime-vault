# 🎌 OneChain Anime Vault

**Bringing Real-World Anime Merchandise Assets On-Chain**

*Hackathon Submission for RWA Track: OneRWA - Real-World Assets*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://onechain-anime-valult.vercel.app/)
[![Demo Video](https://img.shields.io/badge/🎥%20Demo%20Video-Watch%20on%20YouTube-red?style=for-the-badge)](https://www.youtube.com/watch?v=U805mPVBAS0)
[![GitHub](https://img.shields.io/badge/📁%20Source%20Code-View%20on%20GitHub-black?style=for-the-badge)](https://github.com/Sarthak-006/onechain-anime-vault)

---

## 🌟 Project Overview

OneChain Anime Vault revolutionizes the anime merchandise industry by tokenizing real-world anime collectibles as NFTs on the Sui blockchain. Our platform bridges the gap between physical anime merchandise and digital ownership, creating a transparent, secure, and liquid market for anime collectors worldwide.

### 🎯 Problem Statement

The anime merchandise market faces several critical challenges:
- **Authenticity Issues**: Counterfeit products flood the market
- **Limited Liquidity**: Physical collectibles are hard to trade quickly
- **Geographic Barriers**: Rare items are often region-locked
- **Provenance Tracking**: Difficulty in verifying ownership history
- **Creator Compensation**: Artists receive no royalties from secondary sales

### 💡 Our Solution

OneChain Anime Vault tokenizes real-world anime merchandise, providing:
- **Verified Authenticity**: Each NFT includes authenticity codes and proofs
- **Global Accessibility**: Trade authentic anime merchandise worldwide
- **Creator Royalties**: Automatic royalty distribution to original creators
- **Transparent Provenance**: Complete ownership history on-chain
- **Instant Liquidity**: Buy, sell, and trade instantly through our marketplace

---

## 🏗️ Architecture

### Smart Contract Features

Our Sui Move smart contract (`anime_merchandise::anime_nft`) implements:

#### 🎭 **AnimeMerchandise Struct**
- Comprehensive metadata (name, description, rarity, series)
- Creator royalty system (up to 10%)
- Supply management with minting limits
- Authenticity verification codes
- Category classification (figurines, posters, apparel)

#### 🪙 **AnimeNFT Struct**
- Individual token representation
- Ownership tracking
- Authenticity proofs linked to physical items
- Mint date and token ID management

#### 🏪 **Marketplace Infrastructure**
- Decentralized trading platform
- Royalty distribution system
- Event emission for transparency
- Access control with capability-based permissions

### Key Technical Components

```move
// Core structures for RWA tokenization
struct AnimeMerchandise has store, key {
    id: UID,
    name: String,
    description: String,
    rarity: u8, // 1-5 scale
    creator: address,
    royalty_percentage: u64,
    total_supply: u64,
    authenticity_code: vector<u8>, // Links to physical item
    // ... additional metadata
}

struct AnimeNFT has store, key {
    id: UID,
    merchandise_id: ID,
    owner: address,
    authenticity_proof: vector<u8>, // Cryptographic proof of authenticity
    // ... ownership data
}
```

---

## ⚡ Features

### 🎨 **For Creators & Brands**
- **Tokenize Merchandise**: Convert physical anime items to NFTs
- **Royalty System**: Earn 0-10% on all secondary sales
- **Authenticity Guarantee**: Cryptographic proof prevents counterfeiting
- **Global Distribution**: Reach collectors worldwide instantly

### 🛍️ **For Collectors**
- **Verified Authenticity**: Every NFT backed by authenticity codes
- **Rarity System**: 5-tier rarity classification (1-5 scale)
- **Complete Provenance**: Track ownership history
- **Instant Trading**: Buy and sell without geographic limitations

### 🏪 **Marketplace Features**
- **Decentralized Trading**: No intermediary fees
- **Category Filtering**: Browse by figurines, posters, apparel
- **Series Collections**: Discover items by anime series
- **Real-time Events**: Live updates on mints, sales, and transfers

---

## 🚀 Technology Stack

- **Blockchain**: Sui Network
- **Smart Contracts**: Sui Move
- **Frontend**: Next.js / React
- **Deployment**: Vercel
- **Asset Storage**: IPFS (implied for image_url)

---

## 📊 RWA Implementation

### Physical-to-Digital Bridge

1. **Asset Verification**: Physical merchandise verified before tokenization
2. **Authenticity Codes**: Unique cryptographic signatures link NFTs to physical items
3. **Supply Management**: Total supply matches physical inventory
4. **Creator Attribution**: Direct connection to original merchandise creators

### Tokenomics

- **Minting**: Pay-per-mint model with OCT tokens
- **Royalties**: Automatic distribution to creators (0-10%)
- **Trading**: Peer-to-peer marketplace with event tracking
- **Ownership**: True digital ownership with transfer capabilities

---

## 🎮 How It Works

### For Merchandise Creators

1. **Create Item**: Register physical merchandise with metadata
2. **Set Parameters**: Define supply, price, royalty percentage
3. **Add Authenticity**: Include verification codes and proofs
4. **Launch**: Make available for minting by collectors

### For Collectors

1. **Browse Marketplace**: Explore verified anime merchandise
2. **Mint NFT**: Purchase NFT representing physical item
3. **Verify Authenticity**: Check authenticity proofs and codes
4. **Trade/Transfer**: Sell or gift to other collectors

---

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Sarthak-006/onechain-anime-vault.git

# Navigate to project directory
cd onechain-anime-vault

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Configure your Sui network settings

# Run development server
npm run dev
```

### Smart Contract Deployment

```bash
# Compile the Move contract
sui move build

# Deploy to Sui network
sui client publish --gas-budget 20000000
```

---

## 🌐 Live Demo

🔗 **Website**: [https://onechain-anime-valult.vercel.app/](https://onechain-anime-valult.vercel.app/)

🎥 **Demo Video**: [https://www.youtube.com/watch?v=U805mPVBAS0](https://www.youtube.com/watch?v=U805mPVBAS0)

---

## 🏆 Hackathon Submission Details

**Track**: RWA: OneRWA - Bring real-world assets on-chain

**Innovation Points**:
- ✅ **Real-World Asset Integration**: Physical anime merchandise tokenization
- ✅ **Creator Economy**: Automatic royalty distribution system
- ✅ **Authenticity Verification**: Cryptographic proof system
- ✅ **Global Accessibility**: Break down geographic barriers
- ✅ **Decentralized Marketplace**: No intermediary dependencies

**Technical Achievements**:
- Complete Sui Move smart contract implementation
- Comprehensive metadata system for physical assets
- Event-driven architecture for transparency
- Capability-based access control
- Royalty distribution mechanism

---

## 🔮 Future Roadmap

### Phase 1 (Current)
- ✅ Smart contract deployment
- ✅ Basic marketplace functionality
- ✅ NFT minting and trading

### Phase 2 (Next 3 months)
- 🔄 Integration with major anime merchandise brands
- 🔄 Physical redemption system (NFT → Physical item)
- 🔄 Enhanced rarity and collection systems
- 🔄 Mobile app development

### Phase 3 (6-12 months)
- 🔮 Cross-chain compatibility
- 🔮 AR/VR showcase integration
- 🔮 Collaborative creator tools
- 🔮 Advanced analytics dashboard

---

## 👥 Team

Built with passion for anime and blockchain technology.

**GitHub**: [Sarthak-006](https://github.com/Sarthak-006)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Sui Foundation for the robust blockchain infrastructure
- OneRWA for inspiring real-world asset tokenization
- Anime community for continuous support and feedback
- Hackathon organizers for providing this platform

---

**Made with ❤️ for the anime community and blockchain innovation**

*Bridging the gap between physical collectibles and digital ownership*
