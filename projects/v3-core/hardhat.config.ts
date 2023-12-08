import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-watcher'
import 'dotenv/config'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const LOW_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 2_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 400,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const bscTestnet: NetworkUserConfig = {
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
}

const bscMainnet: NetworkUserConfig = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
}

const goerli: NetworkUserConfig = {
  url: 'https://rpc.ankr.com/eth_goerli',
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
}

const eth: NetworkUserConfig = {
  url: 'https://eth.llamarpc.com',
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
}

const eCredits: NetworkUserConfig = {
  url: "https://rpc.ecredits.com",
  gasPrice: 21000000000,
  accounts: [process.env.KEY_ECREDITS_MAIN!]
}

const ecreditsTestnet: NetworkUserConfig = {
  url: "https://rpc.tst.ecredits.com",
  gasPrice: 21000000000,
  accounts: [process.env.KEY_ECREDITS_TEST!]
}

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.KEY_ECREDITS_MAIN && {eCredits}),
    ...(process.env.KEY_ECREDITS_TEST && {ecreditsTestnet})
    // mainnet: bscMainnet,
  },
  etherscan: {
    apiKey: {
      "ecreditsTestnet": '0',
      "eCredits": '0'
    },
    customChains: [
      {
          network: "ecreditsTestnet",
          chainId: 63001,
          urls: {
              apiURL: "https://explorer.tst.ecredits.com/api",
              browserURL: "https://rpc.tst.ecredits.com",
          },
      },
      {
        network: "eCredits",
        chainId: 63000,
        urls: {
            apiURL: "https://explorer.ecredits.com/api",
            browserURL: "https://rpc.ecredits.com",
        },
    }
    ]
  },
  namedAccounts: {
    deployer: 0,
},
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/PancakeV3Pool.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/PancakeV3PoolDeployer.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/OutputCodeHash.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
},
  docgen: {
    pages: 'files',
  },
}
