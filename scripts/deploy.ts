import { SuiClient, getFullnodeUrl } from '@onelabs/sui/client';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { TransactionBlock } from '@onelabs/sui/transactions';
import { fromB64 } from '@onelabs/sui/utils';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const TESTNET_URL = 'https://rpc-testnet.onelabs.cc:443';
const DEPLOYER_ADDRESS = '0x0afb16edad0861f1c1d3238bee4a759a75aad531ed363ee692a30108d6c4c8a4';

async function main() {
    console.log('🚀 Starting deployment of Anime Merchandise Tokenization Platform...');
    
    // Initialize Sui client
    const client = new SuiClient({ url: TESTNET_URL });
    console.log(`✅ Connected to OneChain testnet: ${TESTNET_URL}`);
    
    // Generate or load keypair
    let keypair: Ed25519Keypair;
    
    // Check if keyfile exists
    const keyfilePath = path.join(__dirname, '../.sui/sui_config/sui.keystore');
    if (fs.existsSync(keyfilePath)) {
        const keystore = JSON.parse(fs.readFileSync(keyfilePath, 'utf8'));
        const privateKey = fromB64(keystore[0]);
        keypair = Ed25519Keypair.fromSecretKey(privateKey);
        console.log('✅ Loaded existing keypair from keystore');
    } else {
        // Generate new keypair
        keypair = new Ed25519Keypair();
        console.log('✅ Generated new keypair');
        console.log(`📝 Public key: ${keypair.getPublicKey().toSuiAddress()}`);
        console.log('⚠️  Please save this keypair securely!');
    }
    
    const address = keypair.getPublicKey().toSuiAddress();
    console.log(`📍 Deployer address: ${address}`);
    
    // Check balance
    try {
        const balance = await client.getBalance({
            owner: address,
            coinType: '0x2::sui::SUI'
        });
        console.log(`💰 Balance: ${balance.totalBalance} SUI`);
        
        if (parseInt(balance.totalBalance) < 1000000000) { // Less than 1 SUI
            console.log('⚠️  Low balance detected. Please ensure you have sufficient SUI for deployment.');
        }
    } catch (error) {
        console.log('⚠️  Could not fetch balance, proceeding with deployment...');
    }
    
    // Build and deploy the package
    console.log('\n🔨 Building and deploying smart contract...');
    
    try {
        // Create transaction block for deployment
        const tx = new TransactionBlock();
        
        // Deploy the package
        const [upgradeCap] = tx.publish({
            modules: [
                fs.readFileSync(path.join(__dirname, '../build/anime_merchandise/bytecode_modules/anime_nft.mv')).toString('base64')
            ],
            dependencies: []
        });
        
        // Transfer upgrade capability to deployer
        tx.transferObjects([upgradeCap], tx.pure(address));
        
        // Execute transaction
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
        
        console.log('✅ Deployment successful!');
        console.log(`📦 Transaction digest: ${result.digest}`);
        console.log(`🏗️  Package ID: ${result.objectChanges?.find(change => change.type === 'published')?.packageId}`);
        
        // Initialize marketplace
        console.log('\n🏪 Initializing marketplace...');
        await initializeMarketplace(client, keypair, result.objectChanges?.find(change => change.type === 'published')?.packageId);
        
    } catch (error) {
        console.error('❌ Deployment failed:', error);
        throw error;
    }
}

async function initializeMarketplace(client: SuiClient, keypair: Ed25519Keypair, packageId: string | undefined) {
    if (!packageId) {
        console.log('⚠️  Package ID not found, skipping marketplace initialization');
        return;
    }
    
    try {
        const tx = new TransactionBlock();
        
        // Call the init function
        tx.moveCall({
            target: `${packageId}::anime_nft::init`,
            arguments: []
        });
        
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true
            }
        });
        
        console.log('✅ Marketplace initialized successfully!');
        console.log(`📝 Transaction digest: ${result.digest}`);
        
        // Save deployment info
        const deploymentInfo = {
            packageId,
            marketplaceInitTx: result.digest,
            deployerAddress: keypair.getPublicKey().toSuiAddress(),
            network: 'testnet',
            deployedAt: new Date().toISOString()
        };
        
        fs.writeFileSync(
            path.join(__dirname, '../deployment-info.json'),
            JSON.stringify(deploymentInfo, null, 2)
        );
        
        console.log('📄 Deployment info saved to deployment-info.json');
        
    } catch (error) {
        console.error('❌ Marketplace initialization failed:', error);
        throw error;
    }
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

// Run deployment
main()
    .then(() => {
        console.log('\n🎉 Deployment completed successfully!');
        console.log('🌟 Your Anime Merchandise Tokenization Platform is now live on OneChain testnet!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Deployment failed:', error);
        process.exit(1);
    });
