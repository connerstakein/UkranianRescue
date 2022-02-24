import { LoadingOutlined } from '@ant-design/icons'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { Spin } from 'antd'
import { GreyCard } from 'components/Card'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { String } from 'typescript-string-operations'

const Newinput = styled.input`
  border: 2px solid;
  border-radius: 25px;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  text-color: #ffffff;
  margin: 0.25rem;
  min-width: 175px;
  padding: 0.5rem;
  transition: border-color 0.5s ease-out;
  background: #ff3333;
  font-weight: bold;
`
const Styledtext = styled.text`
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  text-color: #ffffff;
  font-weight: bold;
`
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const UserTokenBalance = () => {
  const [loading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  const showConnectAWallet = Boolean(!account)
  const [userBalance, setuserBalance] = useState(Number)
  const [claimableBalance, setclaimableBalance] = useState(String)
  const [ReferenceVolume, setReferenceVolume] = useState(Number)
  const context = useWeb3React()
  const { library } = context
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
          'https://api.etherscan.io/api?module=contract&action=getabi&address=0x83e9f223e1edb3486f876ee888d76bfba26c475a&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
        )

        const data = await response.json()
        const abi = data.result
        console.log(abi)
        const contractaddress = '0x83e9f223e1edb3486f876ee888d76bfba26c475a'
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
          'https://api.etherscan.io/api?module=contract&action=getabi&address=0x83e9f223e1edb3486f876ee888d76bfba26c475a&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q'
        )

        const data = await response.json()
        const abi = data.result
        console.log(abi)
        const contractaddress = '0x83e9f223e1edb3486f876ee888d76bfba26c475a'
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
      <GreyCard
        style={{
          maxWidth: '800px',
          marginBottom: '10px',
        }}
      >
        <Styledtext style={{ justifyContent: 'right', textAlign: 'left', paddingRight: 250 }}>
          {' '}
          Your Claimable USDC {''} {claimableBalance}
        </Styledtext>
        <Styledtext style={{ justifyContent: 'right', textAlign: 'right' }}>
          Your Token Balance {''} {userBalance}
        </Styledtext>
      </GreyCard>
      <GreyCard
        style={{
          textAlign: 'left',
          maxWidth: '800px',
          marginBottom: '10px',
        }}
      >
        <Styledtext> Reference Volume </Styledtext>
        <Newinput
          type="Number"
          placeholder="Sample Reference Volume"
          onChange={(e: any) => setReferenceVolume(e.target.value)}
        ></Newinput>{' '}
        <p></p>
        <Styledtext>
          {' '}
          Your Potential Rewards {''} {((userBalance / 10000) * ReferenceVolume * 0.2).toFixed(2)}
          {loading ? <Spin indicator={antIcon} className="add-spinner" /> : ''}{' '}
        </Styledtext>
      </GreyCard>
    </>
  )
}

export default UserTokenBalance
