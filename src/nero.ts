import axios from 'axios';

const NERO_NODE_URL = 'https://neroscan.io/api';
const NERO_API_URL = 'https://api.neroscan.io/api';

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
