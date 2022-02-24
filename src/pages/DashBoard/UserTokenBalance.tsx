import { LoadingOutlined } from '@ant-design/icons'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { Spin } from 'antd'
import { LightGreyCard } from 'components/Card'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { String } from 'typescript-string-operations'

const ClaimButton = styled.button`

  padding: 10px 40px;
  margin-left: 10px;
  box-shadow: rgb(0, 0, 0) 0px 0px 7px 1px;
  border: 0px groove rgb(28, 110, 164);
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12px;
  font-weight: bold;
  transition: border-color 0.5s ease-out;
  &:hover {
      background-color: #ffffff;
      color: black;
`

const Styledtext = styled.text`
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  text-color: #000000;
  font-weight: bold;
`
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const UserDashBoard = () => {
  const [loading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  const showConnectAWallet = Boolean(!account)
  const [userBalance, setuserBalance] = useState(Number)
  const [claimableBalance, setclaimableBalance] = useState(String)
  const context = useWeb3React()
  const { library } = context
  const provider = new Web3Provider(library.provider)
  const signer = provider.getSigner()

  const handleCompound = useCallback(async () => {
    if (showConnectAWallet) {
      console.log({ message: 'Hold On there Partner, there seems to be an Account err!' })
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
      ) //ClientTokenABIneeded
      const data = await response.json()
      const abi = data.result
      console.log(abi)
      const contractaddress = '0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63' // "clienttokenaddress"
      const contract = new Contract(contractaddress, abi, signer)
      const Compound = await contract.compound() //.claim(account,amount)
      const Compoundtxid = await Compound
      return Compoundtxid
      /////0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63 - jpeg orgran
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [showConnectAWallet, signer])

  const handleClaim = useCallback(async () => {
    if (showConnectAWallet) {
      console.log({ message: 'Hold On there Partner, there seems to be an Account err!' })
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
      ) //ClientTokenABIneeded
      const data = await response.json()
      const abi = data.result
      console.log(abi)
      const contractaddress = '0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63' // "clienttokenaddress"
      const contract = new Contract(contractaddress, abi, signer)
      const ClaimBalance = await contract.claim() //.claim()
      const Claimtxid = await ClaimBalance

      return Claimtxid
      /////
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [showConnectAWallet, signer])

  useEffect(() => {
    async function FetchBalance() {
      if (showConnectAWallet) {
        console.log({ message: 'Hold On there Partner, there seems to be an Account err!' })
        return
      }

      try {
        setLoading(true)
        const provider = new Web3Provider(library.provider)
        const response = await fetch(
          'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
        )

        const data = await response.json()
        const abi = data.result
        console.log(abi)
        const contractaddress = '0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63'
        const contract = new Contract(contractaddress, abi, provider)
        const UserTokenBalance = await contract.balanceOf(account)
        const FinalResult = await UserTokenBalance.toString()
        console.log(FinalResult)
        return FinalResult
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    async function FetchClaimBalance() {
      if (showConnectAWallet) {
        console.log({ message: 'Please connect an Account' })
        return
      }

      try {
        setLoading(true)
        const provider = new Web3Provider(library.provider)
        const response = await fetch(
          'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
        )

        const data = await response.json()
        const abi = data.result
        console.log(abi)
        const contractaddress = '0x8A2b5F4308d896feCe6be7ce4Ec304Bd1d1DfE63'
        const contract = new Contract(contractaddress, abi, provider)
        const UserClaimBalance = await contract.balanceOf(account)
        const test = UserClaimBalance
        const test0 = UserClaimBalance.toString()
        console.log(test)
        return test0
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    FetchClaimBalance()
      .then((result) => formatEther(result))
      .then((result) => JSON.parse(result))
      .then((result) => result.toFixed(2))
      .then((result) => setclaimableBalance(result))

    FetchBalance()
      .then((result) => formatEther(result))
      .then((result) => parseInt(result))
      .then((result) => setuserBalance(result))
  }, [account, showConnectAWallet, library.provider])

  return (
    <>
      <LightGreyCard
        style={{
          maxWidth: '400px',
          marginBottom: '10px',
          position: 'relative',
          right: 210,
          top: 170,
        }}
      >
        <Styledtext style={{ justifyContent: 'right', textAlign: 'left', paddingRight: 250 }}>
          {' '}
          Your Claimable Balance {''} {claimableBalance}
        </Styledtext>{' '}
        <ClaimButton disabled={!account || loading} onClick={handleCompound}>
          Compound
        </ClaimButton>
        <ClaimButton disabled={!account || loading} onClick={handleClaim}>
          {' '}
          Claim{' '}
        </ClaimButton>
      </LightGreyCard>

      <LightGreyCard
        style={{
          maxWidth: '400px',
          marginBottom: '10px',
          position: 'relative',
          right: 210,
          top: 170,
        }}
      >
        <Styledtext style={{ justifyContent: 'right', textAlign: 'right' }}>
          Your Token Balance {''} {userBalance}
        </Styledtext>
      </LightGreyCard>

      <LightGreyCard
        style={{
          textAlign: 'left',
          maxWidth: '400px',
          marginBottom: '10px',
          position: 'relative',
          left: 210,
          height: '120px',
        }}
      >
        <Styledtext> Balance Value </Styledtext>
        {userBalance}
      </LightGreyCard>
      <LightGreyCard
        style={{
          textAlign: 'left',
          maxWidth: '400px',
          marginBottom: '10px',
          position: 'relative',
          left: 210,
        }}
      >
        <Styledtext>
          {' '}
          Earnings Value {''} {claimableBalance}
          {loading ? <Spin indicator={antIcon} className="add-spinner" /> : ''}{' '}
        </Styledtext>
      </LightGreyCard>
    </>
  )
}

export default UserDashBoard
