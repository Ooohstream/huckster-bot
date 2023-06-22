import axios from 'axios';
import { TradeDataResponse } from './interfaces';

export class Huobi {
  private static genericError: string = 'There was an error fetching data from Huobi!';

  private static getInfo = async (
    currency: '11' | '23',
    tradeType: 'sell' | 'buy',
    payMethod: '0' | '1',
    acceptOrder: '0' | '-1',
    amount: '1000' | '100',
  ): Promise<string> => {
    try {
      const { data } = await axios.get<TradeDataResponse>(
        `https://www.huobi.com/-/x/otc/v1/data/trade-market?coinId=2&currency=${currency}&tradeType=${tradeType}&currPage=1&payMethod=${payMethod}&acceptOrder=${acceptOrder}&country=&blockType=general&online=1&range=0&amount=${amount}&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=true&isFollowed=false`,
      );

      if (data.data) {
        const sum = data?.data?.map((tradeItem) => parseFloat(tradeItem.price))[0];
        return sum.toFixed(2);
      }
    } catch {
      return Huobi.genericError;
    }

    return Huobi.genericError;
  };
  static getUsdtInfo = async (): Promise<string> => {
    return await Huobi.getInfo('11', 'sell', '0', '0', '1000');
  };

  static getTryInfo = async (): Promise<string> => {
    return await Huobi.getInfo('23', 'buy', '1', '-1', '100');
  };
}
