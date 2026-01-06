import React, { useState } from 'react';
import { ethers } from 'ethers';
import { QRCodeSVG } from 'qrcode.react';

const PhysicalWalletGenerator = () => {
  const [wallet, setWallet] = useState(null);

  const generate = () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center py-12 font-mono text-black print:bg-white print:py-0">
      {!wallet ? (
        <button 
          onClick={generate}
          className="px-10 py-5 bg-black text-white font-black hover:scale-105 transition-transform"
        >
          GENERATE PASS
        </button>
      ) : (
        <div className="flex flex-col items-center gap-12">
          {/* CONTROL PANEL */}
          <div className="print:hidden flex gap-4">
            <button onClick={() => window.print()} className="border-2 border-black px-4 py-2 font-bold hover:bg-black hover:text-white transition-colors">
              PRINT STICKER SET
            </button>
            <button onClick={() => setWallet(null)} className="opacity-50 text-xs uppercase tracking-widest font-bold">
              Discard
            </button>
          </div>

          <div className="flex flex-col gap-8 print:gap-16 items-center">
            
            {/* FRONT SIDE: THE PUBLIC TICKET */}
            <div className="w-[300px] border-[3px] border-black bg-white p-6 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
              <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-[8px] font-black uppercase">
                Front / Public
              </div>
              
              <div className="border-b-2 border-black pb-4 mb-4">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase">Metro Ethereum</p>
                <p className="text-[24px] font-black leading-none mt-1">PASS</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="p-2 border-2 border-black">
                  <QRCodeSVG value={wallet.address} size={140} level="M" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[8px] font-black block uppercase opacity-50">Balance</label>
                  <p className="text-xl font-black">0.00 ETH</p>
                </div>
                <div>
                  <label className="text-[8px] font-black block uppercase opacity-50">Address</label>
                  <p className="text-[10px] break-all font-bold leading-tight">{wallet.address}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black flex justify-between items-center italic">
                <span className="text-[8px] font-bold">NON-REFUNDABLE</span>
                <span className="text-[12px] font-black italic">№ {wallet.address.slice(2, 8).toUpperCase()}</span>
              </div>
            </div>

            {/* BACK SIDE: THE ADHESIVE MNEMONIC (The "Hidden" Part) */}
            <div className="w-[300px] border-[3px] border-black border-dashed bg-white p-6 relative">
              <div className="absolute top-0 right-0 bg-zinc-200 text-black px-2 py-1 text-[8px] font-black uppercase">
                Back / Adhesive Side
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-black bg-black text-white inline-block px-2 py-1 mb-2">SECRET RECOVERY PHRASE</p>
                <p className="text-[8px] leading-tight opacity-70">
                  Fold this section behind the ticket or stick it directly to a surface. 
                  Once peeled, the phrase below will be revealed.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {wallet.mnemonic.phrase.split(" ").map((word, i) => (
                  <div key={i} className="text-[11px] font-black border-b border-zinc-300 flex justify-between">
                    <span className="opacity-30">{i + 1}</span>
                    <span>{word}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center border-2 border-black p-2">
                <p className="text-[9px] font-black">IF FOUND: DO NOT SCAN</p>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          @page { margin: 0; }
          body { background-color: white; }
        }
      `}</style>
    </div>
  );
};

export default PhysicalWalletGenerator;
