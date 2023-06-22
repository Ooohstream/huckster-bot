import { Huobi } from '../api';

export class CalculationService {
  static getAverageObject = async () => {
    const usdtAverage = parseFloat(await Huobi.getUsdtInfo());
    const tryAverage = parseFloat(await Huobi.getTryInfo());
    const rubTryAverage = usdtAverage / tryAverage;
    const rubTryAverageWithCommission = rubTryAverage + 0.05 * rubTryAverage;

    return {
      usdtAverage,
      tryAverage,
      rubTryAverage,
      rubTryAverageWithCommission,
    };
  };
  static getAverageMessage = async (): Promise<string> => {
    const { usdtAverage, tryAverage, rubTryAverageWithCommission } =
      await CalculationService.getAverageObject();
    return `USDT: ${usdtAverage}₽ \nTRY: ${tryAverage}₽ \nRUB -> TRY: ${rubTryAverageWithCommission.toFixed(
      2,
    )}₽`;
  };
}
