import { ethers, network } from "hardhat";
import config from "../config";

import { parseEther } from "ethers/lib/utils";
const currentNetwork = network.name;

async function main() {
    // Remember to update the init code hash in SC for different chains before deploying


    
    // /** SmartRouterHelper */
    // console.log("Deploying SmartRouterHelper...");

    // const SmartRouterHelper = await ethers.getContractFactory("SmartRouterHelper");

    // const smartRouterHelper = await SmartRouterHelper.deploy();

    // await smartRouterHelper.deployed();

    // console.log("SmartRouterHelper deployed to:", smartRouterHelper.address);



    /** SmartRouter */
    const networkName = network.name;

    console.log("Deploying SmartRouter at ", networkName);

    const SmartRouter = await ethers.getContractFactory("SmartRouter", {
        libraries: {
            SmartRouterHelper: "0x8834DaCe4Daf7DE8ca83f19E0A8d982A99A21376"
            // SmartRouterHelper: smartRouterHelper.address
        }
    });

    const smartRouter = await SmartRouter.deploy(
        config.factoryV2[networkName],
        "0x1B3Db8f7BC52a022Db4A02A5eF28167B9d032D29",
        config.factoryV3[networkName],
        config.positionManager[networkName],
        config.stableFactory[networkName],
        config.stableInfo[networkName],
        config.WETH[networkName],
    );

    await smartRouter.deployed();

    console.log("SmartRouter deployed to:", smartRouter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });