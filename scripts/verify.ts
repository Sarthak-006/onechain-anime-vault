import { SuiClient } from '@onelabs/sui/client';
import { Ed25519Keypair } from '@onelabs/sui/keypairs/ed25519';
import { fromB64 } from '@onelabs/sui/utils';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const TESTNET_URL = 'https://rpc-testnet.onelabs.cc:443';

async function main() {
    console.log('🔍 Verifying deployment...');
    
    // Load deployment info
    let deploymentInfo: any;
    try {
        deploymentInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../deployment-info.json'), 'utf8'));
        console.log('✅ Deployment info loaded');
    } catch (error) {
        console.error('❌ No deployment info found. Please run deployment first.');
        return;
    }
    
    const { packageId, deployerAddress, marketplaceInitTx } = deploymentInfo;
    console.log(`📦 Package ID: ${packageId}`);
    console.log(`👤 Deployer: ${deployerAddress}`);
    console.log(`🏪 Marketplace Init TX: ${marketplaceInitTx}`);
    
    // Initialize Sui client
    const client = new SuiClient({ url: TESTNET_URL });
    console.log(`✅ Connected to OneChain testnet: ${TESTNET_URL}`);
    
    // Verify package exists
    console.log('\n📦 Verifying package...');
    try {
        const packageInfo = await client.getObject({
            id: packageId,
            options: { showContent: true }
        });
        
        if (packageInfo.data?.content) {
            console.log('✅ Package exists and is accessible');
            console.log(`📄 Package type: ${packageInfo.data.content.dataType}`);
        } else {
            console.log('❌ Package not found or inaccessible');
            return;
        }
    } catch (error) {
        console.error('❌ Error verifying package:', error);
        return;
    }
    
    // Check transaction status
    console.log('\n📝 Verifying marketplace initialization...');
    try {
        const txInfo = await client.getTransactionBlock({
            digest: marketplaceInitTx,
            options: { showEffects: true, showObjectChanges: true }
        });
        
        if (txInfo.effects?.status?.status === 'success') {
            console.log('✅ Marketplace initialization successful');
            
            // Extract marketplace and capability objects
            const objectChanges = txInfo.objectChanges || [];
            let marketplaceId: string | null = null;
            let marketplaceCapId: string | null = null;
            
            for (const change of objectChanges) {
                if (change.type === 'created' && change.objectType?.includes('Marketplace')) {
                    marketplaceId = change.objectId;
                    console.log(`🏪 Marketplace ID: ${marketplaceId}`);
                }
                if (change.type === 'created' && change.objectType?.includes('MarketplaceCap')) {
                    marketplaceCapId = change.objectId;
                    console.log(`🔑 Marketplace Cap ID: ${marketplaceCapId}`);
                }
            }
            
            if (marketplaceId && marketplaceCapId) {
                // Update deployment info with object IDs
                deploymentInfo.marketplaceId = marketplaceId;
                deploymentInfo.marketplaceCapId = marketplaceCapId;
                
                fs.writeFileSync(
                    path.join(__dirname, '../deployment-info.json'),
                    JSON.stringify(deploymentInfo, null, 2)
                );
                
                console.log('📄 Deployment info updated with object IDs');
            }
            
        } else {
            console.log('❌ Marketplace initialization failed');
            console.log(`Status: ${txInfo.effects?.status?.status}`);
            if (txInfo.effects?.status?.error) {
                console.log(`Error: ${txInfo.effects.status.error}`);
            }
        }
    } catch (error) {
        console.error('❌ Error verifying transaction:', error);
    }
    
    // Check deployer balance
    console.log('\n💰 Checking deployer balance...');
    try {
        const balance = await client.getBalance({
            owner: deployerAddress,
            coinType: '0x2::sui::SUI'
        });
        
        console.log(`Balance: ${balance.totalBalance} SUI`);
        console.log(`Coin objects: ${balance.coinObjects.length}`);
        
        if (parseInt(balance.totalBalance) < 1000000000) {
            console.log('⚠️  Low balance detected. Consider getting more testnet tokens.');
        }
    } catch (error) {
        console.log('⚠️  Could not fetch balance');
    }
    
    // Test basic functionality
    console.log('\n🧪 Testing basic functionality...');
    try {
        // Try to read marketplace object
        if (deploymentInfo.marketplaceId) {
            const marketplace = await client.getObject({
                id: deploymentInfo.marketplaceId,
                options: { showContent: true }
            });
            
            if (marketplace.data?.content) {
                console.log('✅ Marketplace object accessible');
                const fields = marketplace.data.content.fields as any;
                console.log(`Total items: ${fields.total_items}`);
                console.log(`Total NFTs: ${fields.total_nfts}`);
            }
        }
        
        // Try to read marketplace capability
        if (deploymentInfo.marketplaceCapId) {
            const capability = await client.getObject({
                id: deploymentInfo.marketplaceCapId,
                options: { showContent: true }
            });
            
            if (capability.data?.content) {
                console.log('✅ Marketplace capability accessible');
            }
        }
        
    } catch (error) {
        console.error('❌ Error testing functionality:', error);
    }
    
    console.log('\n🎉 Verification completed!');
    
    if (deploymentInfo.marketplaceId && deploymentInfo.marketplaceCapId) {
        console.log('\n🚀 Your platform is ready to use!');
        console.log('You can now:');
        console.log('1. Create merchandise items');
        console.log('2. Mint NFTs');
        console.log('3. Trade on the marketplace');
        console.log('\nRun: npm start to use the CLI interface');
    } else {
        console.log('\n⚠️  Some objects are missing. Please check the deployment.');
    }
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

// Run verification
main()
    .then(() => {
        console.log('\n✅ Verification completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Verification failed:', error);
        process.exit(1);
    });
