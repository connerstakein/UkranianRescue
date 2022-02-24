import { LoadingOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
//import { RowBetween } from 'components/Row'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
//import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask' - /////from transaction cofrimation modal index line 127
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
const ClaimButton = styled.button`
  position: relative;
  display: 'block';
  right: 45px;
  left: 527px;
  text-color: #ffffff;
  bottom: 155px;
  padding: 10px 40px;
  border-radius: 25px;
  background-image: linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 148, 0) 70%, rgb(255, 253, 43) 100%);
  box-shadow: rgb(0, 0, 0) 0px 0px 7px 1px;
  border: 0px groove rgb(28, 110, 164);
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12px;
  font-weight: bold;
  transition: border-color 0.5s ease-out;
  &:hover {
      background-color: #ff9d1c;
      color: black;
`
const StyledImg = styled.img`
  justify-content: 'right';
  position: relative;
  margin-bottom: 34px;
`
// left: 600px;
//top: 50px;
const DonateButton = styled.button`
  padding: 10px 4px;
  display: 'block';
  position: relative;
  font-color: #ffffff;
  left: 525px;
  bottom: 175px;
  border-radius: 25px;
  background-image: linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 148, 0) 70%, rgb(255, 253, 43) 100%);
  box-shadow: rgb(0, 0, 0) 0px 0px 7px 1px;
  border: 0px groove rgb(28, 110, 164);
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12px;
  font-weight: bold;
  transition: border-color 0.5s ease-out;
  &:hover {
      background-color: #ff9d1c;
      color: black;
`
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const ClaimTransaction = () => {
  const [Bigloading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  const showConnectAWallet = Boolean(!account)
  const context = useWeb3React()
  const { library } = context
  const provider = new Web3Provider(library.provider)
  const signer = provider.getSigner()
  //const { addToken, success } = useAddTokenToMetamask(currencyToAdd)

  const DAI_QUERY = gql`
    query tokens($tokenAddress: Bytes!) {
      tokens(where: { id: $tokenAddress }) {
        derivedETH
        totalLiquidity
      }
    }
  `

  const ETH_PRICE_QUERY = gql`
    query ethPrice {
      bundle(id: "1") {
        ethPrice
      }
    }
  `
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
  })
  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice
  useEffect(() => {
    const client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
      }),
      cache: new InMemoryCache(),
    })
  })
  return (
    <>
      <div>
        <div>
          Dai price:{' '}
          {ethLoading || daiLoading
            ? 'Loading token data...'
            : '$' +
              // parse responses as floats and fix to 2 decimals
              (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
        </div>
        <div>
          Dai total liquidity:{' '}
          {daiLoading
            ? 'Loading token data...'
            : // display the total amount of DAI spread across all pools
              parseFloat(daiTotalLiquidity).toFixed(0)}
        </div>
      </div>
    </>
  )
}

export default ClaimTransaction
