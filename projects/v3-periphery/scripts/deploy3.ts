import bn from 'bignumber.js'
import { Contract, ContractFactory, utils, BigNumber } from 'ethers'
import { ethers, upgrades, network } from 'hardhat'
import { configs } from '@pancakeswap/common/config'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  QuoterV2: require('../artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'),
  TickLens: require('../artifacts/contracts/lens/TickLens.sol/TickLens.json'),
  V3Migrator: require('../artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
  PancakeInterfaceMulticall: require('../artifacts/contracts/lens/PancakeInterfaceMulticall.sol/PancakeInterfaceMulticallV2.json'),
  // eslint-disable-next-line global-require
  SwapRouter: require('../artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  // eslint-disable-next-line global-require
  NFTDescriptor: require('../artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  // eslint-disable-next-line global-require
  NFTDescriptorEx: require('../artifacts/contracts/NFTDescriptorEx.sol/NFTDescriptorEx.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptor: require('../artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptorOffChain: require('../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'),
  // eslint-disable-next-line global-require
  NonfungiblePositionManager: require('../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),

  WNative: require('../artifacts/contracts/WNative.sol/WETH9.json')
}

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })
function encodePriceSqrt(reserve1: any, reserve0: any) {
  return BigNumber.from(
    // eslint-disable-next-line new-cap
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      // eslint-disable-next-line new-cap
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  )
}

async function main() {
    const [owner] = await ethers.getSigners()
    const networkName = network.name
    console.log('owner', owner.address)
  
    const config = configs[networkName as keyof typeof configs]
  
    if (!config) {
      throw new Error(`No config found for network ${networkName}`)
    }
  
    // const deployedContracts = await import(`../../deployments/${networkName}.json`)
  

  
    // const NFTDescriptor = new ContractFactory(artifacts.NFTDescriptor.abi, artifacts.NFTDescriptor.bytecode, owner)
    // const nftDescriptor = await NFTDescriptor.deploy()
    // await tryVerify(nftDescriptor)
    // console.log('nftDescriptor', nftDescriptor.address)
  
    // const NFTDescriptorEx = new ContractFactory(artifacts.NFTDescriptorEx.abi, artifacts.NFTDescriptorEx.bytecode, owner)
    // const nftDescriptorEx = await NFTDescriptorEx.deploy()
    // await tryVerify(nftDescriptorEx)
    // console.log('nftDescriptorEx', nftDescriptorEx.address)
  
    // const linkedBytecode = linkLibraries(
    //   {
    //     bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,

    const PancakeInterfaceMulticall = new ContractFactory(
      artifacts.PancakeInterfaceMulticall.abi,
      artifacts.PancakeInterfaceMulticall.bytecode,
      owner
    )
  
    const pancakeInterfaceMulticall = await PancakeInterfaceMulticall.deploy()
    console.log('PancakeInterfaceMulticall', pancakeInterfaceMulticall.address)
  


  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })