// NEROブロックチェーンの情報取得用エントリポイント
import axios from 'axios';

// NEROノードのエンドポイント例（適宜変更してください）
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

// アドレスのNERO残高取得
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

// アドレスのトランザクション一覧取得
export async function getAccountTxList(address: string, startblock = 0, endblock = 99999999, page = 1, offset = 10, sort: 'asc' | 'desc' = 'asc') {
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

// 指定ミリ秒sleepするPromise
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// CLI実行例
if (require.main === module) {
    (async () => {
        const address = '0xd94af380778babd792b686a73716af97b32c4fe0'; // サンプルアドレス
        const balance = await getAccountBalance(address);
        console.log('NERO残高:', balance);
        await sleep(250); // レートリミット対策（1秒5回以内）
        const txs = await getAccountTxList(address);
        console.log('トランザクション一覧:', txs);
    })();
}
