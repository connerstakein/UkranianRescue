import { SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components/macro'

import DASH2 from '../../assets/images/DASH2.png'
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

  const StyledImg = styled.img`
    position: relative;
    bottom: 100px;
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
          <StyledImg
            style={{ paddingBottom: 10, alignItems: 'center' }}
            src={DASH2}
            height={400}
            width={800}
            alt="header"
          ></StyledImg>
          <UserTokenBalance></UserTokenBalance>
        </>
      )
    }
  }
}
