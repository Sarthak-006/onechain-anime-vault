import { SuiClient } from '@onelabs/sui/client';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { TransactionBlock } from '@onelabs/sui/transactions';
import { fromB64 } from '@onelabs/sui/utils';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const TESTNET_URL = 'https://rpc-testnet.onelabs.cc:443';

async function main() {
    console.log('🧪 Starting smart contract tests...');
    
    // Load deployment info
    let deploymentInfo: any;
    try {
        deploymentInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../deployment-info.json'), 'utf8'));
        console.log('✅ Loaded deployment info');
    } catch (error) {
        console.error('❌ Could not load deployment info. Please run deployment first.');
        return;
    }
    
    const { packageId, deployerAddress } = deploymentInfo;
    console.log(`📦 Package ID: ${packageId}`);
    console.log(`👤 Deployer: ${deployerAddress}`);
    
    // Initialize Sui client
    const client = new SuiClient({ url: TESTNET_URL });
    console.log(`✅ Connected to OneChain testnet: ${TESTNET_URL}`);
    
    // Load keypair
    const keyfilePath = path.join(__dirname, '../.sui/sui_config/sui.keystore');
    if (!fs.existsSync(keyfilePath)) {
        console.error('❌ Keyfile not found. Please run deployment first.');
        return;
    }
    
    const keystore = JSON.parse(fs.readFileSync(keyfilePath, 'utf8'));
    const privateKey = fromB64(keystore[0]);
    const keypair = Ed25519Keypair.fromSecretKey(privateKey);
    
    const address = keypair.getPublicKey().toSuiAddress();
    console.log(`📍 Test address: ${address}`);
    
    // Test 1: Create anime merchandise item
    console.log('\n📝 Test 1: Creating anime merchandise item...');
    try {
        const tx = new TransactionBlock();
        
        // Get marketplace object
        const marketplace = tx.object('0x...'); // You'll need to get this from the deployment
        
        // Create item
        tx.moveCall({
            target: `${packageId}::anime_nft::create_item`,
            arguments: [
                tx.object('0x...'), // MarketplaceCap
                marketplace,
                tx.pure('Naruto Uzumaki Figurine'),
                tx.pure('Limited edition Naruto figurine with special effects'),
                tx.pure('https://example.com/naruto-figurine.jpg'),
                tx.pure(5), // Rarity
                tx.pure(500), // 5% royalty
                tx.pure(100), // Total supply
                tx.pure(1000000000), // 1 OCT price
                tx.pure('figurine'),
                tx.pure('Naruto'),
                tx.pure(Date.now()),
                tx.pure([1, 2, 3, 4, 5]) // Authenticity code
            ]
        });
        
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
        
        console.log('✅ Item creation successful!');
        console.log(`📝 Transaction: ${result.digest}`);
        
    } catch (error) {
        console.error('❌ Item creation failed:', error);
    }
    
    // Test 2: Mint NFT
    console.log('\n🎨 Test 2: Minting NFT...');
    try {
        const tx = new TransactionBlock();
        
        // Mint NFT
        tx.moveCall({
            target: `${packageId}::anime_nft::mint_nft`,
            arguments: [
                tx.object('0x...'), // MarketplaceCap
                tx.object('0x...'), // Marketplace
                tx.pure('0x...') // Merchandise ID
            ]
        });
        
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
        
        console.log('✅ NFT minting successful!');
        console.log(`📝 Transaction: ${result.digest}`);
        
    } catch (error) {
        console.error('❌ NFT minting failed:', error);
    }
    
    // Test 3: Query marketplace stats
    console.log('\n📊 Test 3: Querying marketplace stats...');
    try {
        const marketplace = await client.getObject({
            id: '0x...', // Marketplace object ID
            options: {
                showContent: true
            }
        });
        
        console.log('✅ Marketplace stats retrieved!');
        console.log(`📦 Total items: ${marketplace.data?.content?.fields?.total_items}`);
        console.log(`🎨 Total NFTs: ${marketplace.data?.content?.fields?.total_nfts}`);
        
    } catch (error) {
        console.error('❌ Query failed:', error);
    }
    
    console.log('\n🎉 All tests completed!');
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

// Run tests
main()
    .then(() => {
        console.log('\n✅ Testing completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Testing failed:', error);
        process.exit(1);
    });
