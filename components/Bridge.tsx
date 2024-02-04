'use client'

import injectedConnector from '@/connector/Connector'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { Button } from 'primereact/button'
import { useState } from 'react'
import DropdownSelect from './ui/Dropdown'

const Bridge = () => {
  const { chainId, account, active, library, activate } = useWeb3React()
  const [amountToBridge, setAmountToBridge] = useState<string>('')

  const BlastBridgeAddress = '0xc644cc19d2A9388b71dd1dEde07cFFC73237Dca8'
  const blastProvider = new ethers.JsonRpcProvider('https://sepolia.blast.io')

  const handleSendToBlast = async (e: any) => {
    e.preventDefault()
    if (amountToBridge === '') return alert('Amount can not be empty!')

    if (!active) {
      await activate(injectedConnector)
    }

    if (active && chainId !== 11155111) {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      })
    }

    const signer = library.getSigner()

    const tx = {
      to: BlastBridgeAddress,
      value: ethers.parseEther(amountToBridge),
    }

    const transaction = await signer.sendTransaction(tx)
    await transaction.wait()
  }

  return (
    <div className="border border-[#696911] w-[580px] py-10 h-[100%]">
      <form className="grid place-items-center" action="">
        <div className="w-full">
          <p className="text-primaryYellow flex items-center">
            DEPOSIT FROM <DropdownSelect classname="md:w-14rem" />
          </p>
          <input
            type="text"
            className="border border-yellow-600 rounded-xl mb-6 px-2 py-2"
            value={amountToBridge}
            required
            onChange={(e) => setAmountToBridge(e.target.value)}
          />{' '}
        </div>
        <br />
        <Button
          onClick={handleSendToBlast}
          className="bg-[#292909] text-[#FCFC05] py-2 px-4"
          label={active ? 'Send to Blast' : 'Connect Wallet'}
        />
      </form>
    </div>
  )
}

export default Bridge
