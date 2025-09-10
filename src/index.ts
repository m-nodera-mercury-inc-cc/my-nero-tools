// NEROブロックチェーンの情報取得用エントリポイント
import { getAccountBalance, getAccountTxList, getNeroDelegatedAmount } from './nero';
import { getNeroMarketRate, getNeroRateFromGate, getGateCurrencyPairs } from './market';
import { sleep } from './utils';

// CLI実行例
if (require.main === module) {
    (async () => {
        const address = '0xd94af380778babd792b686a73716af97b32c4fe0'; // サンプルアドレス
        const balance = await getAccountBalance(address);
        // console.log('NERO残高:', balance);
        // await sleep(250); // レートリミット対策（1秒5回以内）
        // const txs = await getAccountTxList(address);
        // console.log('トランザクション一覧:', txs);
        // const rate = await getNeroMarketRate();
        // console.log('NERO市場価値（USD/JPYレート）:', rate);
        const gateRate = await getNeroRateFromGate();
        console.log('Gate.io NERO/USDTレート:', gateRate);
        const pairs = await getGateCurrencyPairs();
        // console.log('Gate.io全通貨ペア:', pairs.map((p: any) => p.id));
        // // NEROを含むペアを抽出
        // const neroPairs = pairs.filter((p: any) => p.id && p.id.includes('NERO'));
        // if (neroPairs.length > 0) {
        //     console.log('NERO関連ペア:', neroPairs.map((p: any) => p.id));
        // } else {
        //     console.log('NERO関連ペアは見つかりませんでした');
        // }
        // デリゲート数量取得（バリデータ・ステーキング所有者アドレスを指定）
        const valAddress = '0xFc67c341962B4DF4FA9c5b361E795b8f01cDa06d';
        const stakeOwnerAddress = '0x7fa31B94aA7F4ec0A11304edb88aC4f46740AaF9';
        const neroDelegated = await getNeroDelegatedAmount(valAddress, stakeOwnerAddress);
        console.log('NEROデリゲート数量:', neroDelegated);
    })();
}
