#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    console.log('🎌 Setting up Anime Merchandise Tokenization Platform...\n');

    // Check prerequisites
    console.log('🔍 Checking prerequisites...');

    // Check Node.js
    try {
        const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
        console.log(`✅ Node.js: ${nodeVersion}`);

        const version = parseInt(nodeVersion.replace('v', '').split('.')[0]);
        if (version < 18) {
            console.log('⚠️  Node.js version 18 or higher is recommended');
        }
    } catch (error) {
        console.error('❌ Node.js not found. Please install Node.js 18+ first.');
        process.exit(1);
    }

    // Check npm
    try {
        const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
        console.log(`✅ npm: ${npmVersion}`);
    } catch (error) {
        console.error('❌ npm not found. Please install npm first.');
        process.exit(1);
    }

    // Check Sui CLI
    try {
        const suiVersion = execSync('sui --version', { encoding: 'utf8' }).trim();
        console.log(`✅ Sui CLI: ${suiVersion}`);
    } catch (error) {
        console.log('⚠️  Sui CLI not found.');
        console.log('💡 Sui CLI is required for building Move contracts.');
        console.log('📋 Manual installation options:');
        console.log('   1. Install from source: cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui');
        console.log('   2. Download pre-built binary: https://github.com/MystenLabs/sui/releases');
        console.log('   3. Use Docker: docker run --rm -it -v $(pwd):/workspace mysten/sui:latest');
        console.log('⚠️  Continuing setup without Sui CLI...');
    }

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully!');
    } catch (error) {
        console.error('❌ Failed to install dependencies:', error);
        process.exit(1);
    }

    // Create necessary directories
    console.log('\n📁 Creating project structure...');
    const dirs = [
        'build',
        '.sui/sui_config',
        'src/contracts'
    ];

    for (const dir of dirs) {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`✅ Created: ${dir}`);
        }
    }

    // Check if Move.toml exists
    const moveTomlPath = path.join(__dirname, '../Move.toml');
    if (!fs.existsSync(moveTomlPath)) {
        console.error('❌ Move.toml not found. Please ensure the project files are properly set up.');
        process.exit(1);
    }

    // Check if smart contract exists
    const contractPath = path.join(__dirname, '../src/contracts/AnimeMerchandise.move');
    if (!fs.existsSync(contractPath)) {
        console.error('❌ Smart contract not found. Please ensure the project files are properly set up.');
        console.error(`Expected path: ${contractPath}`);
        process.exit(1);
    }

    console.log('✅ Project structure verified!');

    // Build the project
    console.log('\n🔨 Building smart contract...');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed successfully!');
    } catch (error) {
        console.log('⚠️  Build failed. This is expected without Sui CLI.');
        console.log('💡 Build will work after installing Sui CLI.');
    }

    // Setup instructions
    console.log('\n🎯 Setup completed! Next steps:');
    console.log('1. Install Sui CLI (see instructions above)');
    console.log('2. Build smart contract: npm run build');
    console.log('3. Get testnet tokens: npm run faucet');
    console.log('4. Deploy to testnet: npm run deploy');
    console.log('5. Verify deployment: npm run verify');
    console.log('6. Test functionality: npm run test');
    console.log('7. Use CLI interface: npm start');

    console.log('\n📚 For more information, see README.md');
    console.log('🌐 OneChain documentation: https://doc-testnet.onelabs.cc/typescript');

    console.log('\n🎉 Setup completed successfully!');
    console.log('💡 Remember to install Sui CLI before building contracts.');
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

// Run setup
main()
    .then(() => {
        console.log('\n✅ Setup completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Setup failed:', error);
        process.exit(1);
    });
