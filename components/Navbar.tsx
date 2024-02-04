'use client'

import Link from 'next/link'
import { Menubar } from 'primereact/menubar'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import injectedConnector from '@/connector/Connector'

const Navbar = () => {
  const { chainId, account, activate, active, library, deactivate } =
    useWeb3React()

  const handleConnectWallet = async () => {
    await activate(injectedConnector)
  }

  const handleDisconnectWallet = () => {
    deactivate()
  }

  const handleAddBlastNetwork = async () => {
    try {
      await library.provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xa0c71fd',
            chainName: 'Blast Sepolia',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.blast.io/'],
            blockExplorerUrls: ['https://testnet.blastscan.io'],
          },
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (active && chainId === 168587773) return
    const switchNetwork = async () => {
      if (active && chainId !== 11155111) {
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        })
      }
    }
    switchNetwork()
  })

  const items: any = []
  const start = (
    <Link
      className="flex items-center justify-start gap-2 no-underline"
      href="/"
    >
      <h1 className="hidden md:block text-center font-brand text-[1.5rem] mt-2 text-offWhite">
        Blast Bridge
      </h1>
    </Link>
  )

  const end = (
    <>
      {!active ? (
        <button
          onClick={handleConnectWallet}
          className="cursor-pointer uppercase bg-[#292909] text-[12px] md:text-base py-[6px] px-3 md:py-2 md:px-5 text-[#FCFC05] rounded-2xl"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center">
          <button
            onClick={handleDisconnectWallet}
            className="cursor-pointer uppercase bg-[#292909] text-[12px] md:text-base py-[6px] px-3 md:py-2 md:px-5 text-[#FCFC05] rounded-2xl"
          >
            Disconnect
          </button>
          <button
            onClick={handleAddBlastNetwork}
            className="cursor-pointer uppercase bg-[#292909] text-[12px] md:text-base py-[6px] px-3 md:py-2 md:px-5 text-[#FCFC05] rounded-2xl"
          >
            Add BLAST
          </button>
        </div>
      )}
    </>
  )

  return (
    <div className="absolute top-0 z-[1] w-full card">
      <div className="container mx-auto md:py-5 lg:py-3 md:px-6">
        <Menubar
          className="justify-end gap-4 bg-[transparent] px-4 md:px-0"
          model={items}
          start={start}
          end={end}
        />
      </div>
    </div>
  )
}

export default Navbar
