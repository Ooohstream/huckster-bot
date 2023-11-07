import { Huobi } from '../api';

export class CalculationService {
  static commission: number = Number(process.env.COMMISSION) || 1;
  static getAverageObject = async () => {
    const usdtAverage = parseFloat(await Huobi.getUsdtInfo());
    const tryAverage = parseFloat(await Huobi.getTryInfo());
    const rubTryAverage = usdtAverage / tryAverage;
    const rubTryAverageWithCommission = rubTryAverage + this.commission * rubTryAverage;

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
