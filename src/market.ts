import axios from 'axios';
import { SpotApi } from 'gate-api';

export async function getNeroMarketRate() {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
            ids: 'nero',
            vs_currencies: 'usd,jpy'
        }
    });
    return res.data;
}

export async function getNeroRateFromGate() {
    const api = new SpotApi();
    const resp = await api.listTickers({ currencyPair: 'NERO_USDT' });
    if (resp.body && Array.isArray(resp.body)) {
        return resp.body[0] || null;
    }
    return null;
}

export async function getGateCurrencyPairs() {
    const api = new SpotApi();
    const resp = await api.listCurrencyPairs();
    return resp.body || [];
}
