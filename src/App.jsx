import React, { useState } from 'react';
import { ethers } from 'ethers';
import { QRCodeSVG } from 'qrcode.react';

const SophisticatedWallet = () => {
  const [wallet, setWallet] = useState(null);

  const generateWallet = () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F2F2] p-6 font-mono text-black">
      {!wallet ? (
        <button
          onClick={generateWallet}
          className="group relative px-8 py-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-300 tracking-tighter font-bold"
        >
          ISSUE NEW WALLET TICKET
        </button>
      ) : (
        <div className="w-full max-w-sm">
          {/* Main Ticket Body */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            
            {/* Top Section */}
            <div className="p-6 text-center">
              <div className="flex justify-between items-center mb-6 text-[10px] font-black border-b border-black pb-2">
                <span>METRO ETHEREUM</span>
                <span>NON-TRANSFERABLE</span>
              </div>

              <div className="inline-block p-2 border-2 border-black bg-white mb-4">
                <QRCodeSVG 
                  value={wallet.address} 
                  size={160} 
                  level="H"
                  includeMargin={false}
                />
              </div>
              
              <h2 className="text-[10px] tracking-widest uppercase opacity-50">Public Entry Point</h2>
            </div>

            {/* Perforation Divider with "Cut-out" circles */}
            <div className="relative h-px w-full border-t-2 border-dashed border-black my-2">
              <div className="absolute -left-3 -top-3 w-6 h-6 bg-[#F2F2F2] border-2 border-black rounded-full"></div>
              <div className="absolute -right-3 -top-3 w-6 h-6 bg-[#F2F2F2] border-2 border-black rounded-full"></div>
            </div>

            {/* Bottom Section */}
            <div className="p-6 pt-4 bg-white">
              <div className="mb-4">
                <label className="text-[9px] font-bold block mb-1">IDENTIFIER (PUBLIC ADDRESS)</label>
                <p className="text-xs break-all leading-relaxed font-bold border-l-4 border-black pl-3 py-1">
                  {wallet.address}
                </p>
              </div>

              <div className="flex justify-between items-end text-[9px] font-bold mt-8">
                <div>
                  <p>VALID: PERPETUAL</p>
                  <p>GAS: REQUIRED</p>
                </div>
                <div className="text-right">
                  <p className="text-lg leading-none">№ {wallet.address.slice(2, 8).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Warning Section (Private Key) */}
          <div className="mt-8 p-4 border-2 border-black bg-yellow-50 text-[10px] leading-tight">
            <p className="font-bold underline mb-2">CRITICAL SECURITY NOTICE:</p>
            <p className="mb-2">This ticket only contains your public address. To spend funds, you must store your Private Key securely. Do not lose it.</p>
            <p className="break-all font-mono bg-white p-2 border border-black select-all">
              {wallet.privateKey}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SophisticatedWallet;
