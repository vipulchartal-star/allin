import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletGenerator = () => {
  const [wallet, setWallet] = useState(null);

  const createWallet = () => {
    // Generates a random mnemonic-based HD wallet
    const newWallet = ethers.Wallet.createRandom();
    
    setWallet({
      address: newWallet.address,
      privateKey: newWallet.privateKey,
      mnemonic: newWallet.mnemonic.phrase
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>ETH Wallet Generator</h2>
      <button onClick={createWallet}>Generate New Wallet</button>

      {wallet && (
        <div style={{ marginTop: '20px', wordBreak: 'break-all' }}>
          <p><strong>Address:</strong> {wallet.address}</p>
          <p><strong>Mnemonic (Seed Phrase):</strong> {wallet.mnemonic}</p>
          <p style={{ color: 'red' }}>
            <strong>Private Key:</strong> {wallet.privateKey} 
            <br/><em>(Never share this!)</em>
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletGenerator;
