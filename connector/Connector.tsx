import { InjectedConnector } from '@web3-react/injected-connector'

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 5, 11155111, 168587773],
})

export default injectedConnector
