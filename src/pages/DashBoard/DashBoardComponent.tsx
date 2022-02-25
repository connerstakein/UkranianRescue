import { SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components/macro'

import { LightGreyCard } from '../../components/Card'
//import ClaimTransaction from './ClaimTransaction'
//import Metrics from './PriceCalls'
//import Funcalculations from './FunCalculations'
import UserTokenBalance from './UserTokenBalance'

export default function DashBoardComponent() {
  const { account, chainId } = useActiveWeb3React()
  const showConnectAWallet = Boolean(!account)
  //const propernetwork = Boolean(!chainId)
  const isNotOnMainnet = Boolean(chainId && chainId !== SupportedChainId.BINANCESMARTCHAIN)

  const StyledHeader = styled.text`
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
    font-size: 35px;
    text-color: #000000;
    font-weight: bold;
  `

  const StyledText = styled.text`
    font-size: 20px;
    text-color: #ffffff;
  `
  if (isNotOnMainnet) {
    return (
      <LightGreyCard
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#fff700',
          maxWidth: '800px',
        }}
      >
        {' '}
        <StyledText style={{ justifyContent: 'center' }}> Please Connect to Binance Smart Chain</StyledText>{' '}
      </LightGreyCard>
    )
  } else {
    if (showConnectAWallet) {
      return (
        <LightGreyCard
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#fff700',
            maxWidth: '800px',
          }}
        >
          {' '}
          <StyledText style={{ justifyContent: 'center' }}> Connect a wallet to continue </StyledText>{' '}
        </LightGreyCard>
      )
    } else {
      return (
        <>
          <StyledHeader> Token Holder DashBoard</StyledHeader>
          <UserTokenBalance></UserTokenBalance>
        </>
      )
    }
  }
}
