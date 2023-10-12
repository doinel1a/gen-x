import { AbiRegistry, Address, SmartContract } from '@multiversx/sdk-core/out';
import { contractAddress } from '../config/devnet';
import contractAbi from '../contracts-abi/contract.abi.json';

const abiRegistry = AbiRegistry.create(contractAbi);

const contract = new SmartContract({
  address: new Address(contractAddress),
  abi: abiRegistry
});

export default contract;