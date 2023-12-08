import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'
import {network} from 'hardhat'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@pancakeswap/v3-core/deployments/${networkName}.json`)

  // Verify PancakeV3PoolDeployer
  console.log('Verify PancakeV3PoolDeployer')
  await verifyContract("0x4AC7E48fe2F31122Cd49B801988afA69E56DD439")
  await sleep(10000)

  // Verify pancakeV3Factory
  // console.log('Verify pancakeV3Factory')
  // await verifyContract(deployedContracts.PancakeV3Factory, [deployedContracts.PancakeV3PoolDeployer])
  // await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
