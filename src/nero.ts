import axios from 'axios';
import { ethers } from 'ethers';

const NERO_NODE_URL = 'https://neroscan.io/api';
const NERO_API_URL = 'https://api.neroscan.io/api';
const NERO_STAKE_CONTRACT = '0x000000000000000000000000000000000000f000';
const NERO_RPC = 'https://rpc.nerochain.io'; // EVM互換RPC（修正済み）

export async function getLatestBlock() {
    const res = await axios.get(`${NERO_NODE_URL}/block/latest`);
    return res.data;
}

export async function getTransaction(txId: string) {
    const res = await axios.get(`${NERO_NODE_URL}/transaction/${txId}`);
    return res.data;
}

export async function getAccountBalance(address: string) {
    const res = await axios.get(NERO_API_URL, {
        params: {
            module: 'account',
            action: 'balance',
            address
        }
    });
    return res.data;
}

export async function getAccountTxList(
    address: string,
    startblock = 0,
    endblock = 99999999,
    page = 1,
    offset = 10,
    sort: 'asc' | 'desc' = 'asc'
) {
    const res = await axios.get(NERO_API_URL, {
        params: {
            module: 'account',
            action: 'txlist',
            address,
            startblock,
            endblock,
            page,
            offset,
            sort
        }
    });
    return res.data;
}

/**
 * 指定アドレスのNEROデリゲート数量（anyClaimable）を取得
 * @param valAddress バリデータアドレス
 * @param stakeOwnerAddress ステーキング所有者アドレス
 */
export async function getNeroDelegatedAmount(valAddress: string, stakeOwnerAddress: string): Promise<string> {
    const abi = [
        'function anyClaimable(address _val, address _stakeOwner) view returns (uint256)'
    ];
    const provider = new ethers.JsonRpcProvider(NERO_RPC);
    const contract = new ethers.Contract(NERO_STAKE_CONTRACT, abi, provider);
    const amount = await contract.anyClaimable(valAddress, stakeOwnerAddress);
    return amount.toString();
}
