import { Huobi } from '../api';

export class CalculationService {
  static getAverageMessage = async (): Promise<string> => {
    const usdtAverage = parseFloat(await Huobi.getUsdtInfo());
    const tryAverage = parseFloat(await Huobi.getTryInfo());
    const rubTryAverage = usdtAverage / tryAverage;
    const rubTryAverageWithCommission = rubTryAverage + 0.05 * rubTryAverage;
    return `USDT: ${usdtAverage} \nTRY: ${tryAverage} \nRUB -> TRY: ${rubTryAverageWithCommission.toFixed(
      2
    )}`;
  };
}
