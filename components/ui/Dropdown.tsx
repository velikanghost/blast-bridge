import { useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

interface DropdownSelectProps {
  classname: string
}

interface Network {
  name: string
  icon: any
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ classname }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null)
  const networks: Network[] = [{ name: 'Sepolia', icon: 'NY' }]

  return (
    <Dropdown
      value={selectedNetwork}
      onChange={(e: DropdownChangeEvent) => setSelectedNetwork(e.value)}
      options={networks}
      optionLabel="name"
      placeholder={networks[0].name}
      className={classname}
    />
  )
}

export default DropdownSelect
