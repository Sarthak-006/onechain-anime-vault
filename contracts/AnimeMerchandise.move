module anime_merchandise::anime_nft {
    use std::string::{Self, String};
    use std::vector;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::url::{Self, Url};

    // Error codes
    const EInsufficientBalance: u64 = 0;
    const EInvalidRoyaltyPercentage: u64 = 1;
    const EItemNotFound: u64 = 2;
    const EUnauthorized: u64 = 3;

    // Struct for anime merchandise metadata
    struct AnimeMerchandise has store, key {
        id: UID,
        name: String,
        description: String,
        image_url: Url,
        rarity: u8, // 1-5 scale
        creator: address,
        royalty_percentage: u64, // Basis points (100 = 1%)
        total_supply: u64,
        minted_count: u64,
        price: u64, // Price in OCT
        category: String, // "figurine", "poster", "apparel"
        series: String,
        release_date: u64,
        authenticity_code: vector<u8>
    }

    // Struct for individual NFT tokens
    struct AnimeNFT has store, key {
        id: UID,
        merchandise_id: ID,
        token_id: u64,
        owner: address,
        mint_date: u64,
        authenticity_proof: vector<u8>
    }

    // Struct for marketplace
    struct Marketplace has key {
        id: UID,
        items: Table<ID, AnimeMerchandise>,
        nfts: Table<ID, AnimeNFT>,
        total_items: u64,
        total_nfts: u64
    }

    // Struct for royalty distribution
    struct RoyaltyPool has key {
        id: UID,
        creator: address,
        balance: Balance<OCT>,
        total_earned: u64
    }

    // Events
    struct ItemCreated has copy, drop {
        item_id: ID,
        name: String,
        creator: address,
        price: u64
    }

    struct NFTMinted has copy, drop {
        nft_id: ID,
        merchandise_id: ID,
        token_id: u64,
        owner: address
    }

    struct NFTSold has copy, drop {
        nft_id: ID,
        seller: address,
        buyer: address,
        price: u64
    }

    struct RoyaltyPaid has copy, drop {
        creator: address,
        amount: u64,
        nft_id: ID
    }

    // Capability for marketplace operations
    struct MarketplaceCap has key, store {
        id: UID
    }

    // Initialize marketplace
    fun init(ctx: &mut TxContext) {
        let marketplace = Marketplace {
            id: object::new(ctx),
            items: table::new(ctx),
            nfts: table::new(ctx),
            total_items: 0,
            total_nfts: 0
        };
        
        transfer::share_object(marketplace);
        
        // Create marketplace capability
        let cap = MarketplaceCap {
            id: object::new(ctx)
        };
        transfer::transfer(cap, tx_context::sender(ctx));
    }

    // Create new anime merchandise item
    public fun create_item(
        cap: &mut MarketplaceCap,
        marketplace: &mut Marketplace,
        name: String,
        description: String,
        image_url: Url,
        rarity: u8,
        royalty_percentage: u64,
        total_supply: u64,
        price: u64,
        category: String,
        series: String,
        release_date: u64,
        authenticity_code: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(royalty_percentage <= 1000, EInvalidRoyaltyPercentage); // Max 10%
        assert!(rarity >= 1 && rarity <= 5, EInvalidRoyaltyPercentage);
        
        let item = AnimeMerchandise {
            id: object::new(ctx),
            name,
            description,
            image_url,
            rarity,
            creator: tx_context::sender(ctx),
            royalty_percentage,
            total_supply,
            minted_count: 0,
            price,
            category,
            series,
            release_date,
            authenticity_code
        };
        
        let item_id = object::id(&item);
        table::add(&mut marketplace.items, item_id, item);
        marketplace.total_items = marketplace.total_items + 1;
        
        event::emit(ItemCreated {
            item_id,
            name: string::utf8(b""), // Placeholder
            creator: tx_context::sender(ctx),
            price
        });
    }

    // Mint NFT from merchandise item
    public fun mint_nft(
        cap: &mut MarketplaceCap,
        marketplace: &mut Marketplace,
        merchandise_id: ID,
        ctx: &mut TxContext
    ): AnimeNFT {
        let item = table::borrow_mut(&mut marketplace.items, merchandise_id);
        assert!(item.minted_count < item.total_supply, EItemNotFound);
        
        let nft = AnimeNFT {
            id: object::new(ctx),
            merchandise_id,
            token_id: item.minted_count + 1,
            owner: tx_context::sender(ctx),
            mint_date: tx_context::epoch(ctx),
            authenticity_proof: item.authenticity_code
        };
        
        item.minted_count = item.minted_count + 1;
        marketplace.total_nfts = marketplace.total_nfts + 1;
        
        let nft_id = object::id(&nft);
        event::emit(NFTMinted {
            nft_id,
            merchandise_id,
            token_id: nft.token_id,
            owner: tx_context::sender(ctx)
        });
        
        nft
    }

    // Transfer NFT ownership
    public fun transfer_nft(
        nft: AnimeNFT,
        recipient: address,
        ctx: &mut TxContext
    ) {
        transfer::transfer(nft, recipient);
    }

    // Get merchandise item
    public fun get_item(marketplace: &Marketplace, item_id: ID): &AnimeMerchandise {
        table::borrow(&marketplace.items, item_id)
    }

    // Get NFT
    public fun get_nft(marketplace: &Marketplace, nft_id: ID): &AnimeNFT {
        table::borrow(&marketplace.nfts, nft_id)
    }

    // Get total items count
    public fun get_total_items(marketplace: &Marketplace): u64 {
        marketplace.total_items
    }

    // Get total NFTs count
    public fun get_total_nfts(marketplace: &Marketplace): u64 {
        marketplace.total_nfts
    }
}
