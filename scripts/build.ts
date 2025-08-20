import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    console.log('🔨 Building Move smart contract...');
    
    // Check if sui CLI is installed
    try {
        execSync('sui --version', { stdio: 'pipe' });
        console.log('✅ Sui CLI found');
    } catch (error) {
        console.error('❌ Sui CLI not found. Please install it first:');
        console.error('   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui');
        process.exit(1);
    }
    
    // Create build directory
    const buildDir = path.join(__dirname, '../build');
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }
    
    try {
        // Build the package
        console.log('📦 Building package...');
        execSync('sui move build', { 
            cwd: path.join(__dirname, '..'),
            stdio: 'inherit'
        });
        
        console.log('✅ Build completed successfully!');
        console.log('📁 Build artifacts are in the build/ directory');
        
        // List build artifacts
        const buildPath = path.join(__dirname, '../build/anime_merchandise');
        if (fs.existsSync(buildPath)) {
            console.log('\n📋 Build artifacts:');
            listBuildArtifacts(buildPath);
        }
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

function listBuildArtifacts(dir: string, indent: string = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            console.log(`${indent}📁 ${item}/`);
            listBuildArtifacts(itemPath, indent + '  ');
        } else {
            console.log(`${indent}📄 ${item}`);
        }
    }
}

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error);
    process.exit(1);
});

// Run build
main()
    .then(() => {
        console.log('\n🎉 Build process completed!');
        console.log('🚀 Ready for deployment!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Build process failed:', error);
        process.exit(1);
    });
