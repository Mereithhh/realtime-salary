import { SalaryData, currencySymbols, periodSeconds } from './types';

/**
 * 计算给定时间内的收入
 */
export function calculateEarnings(salaryData: SalaryData, seconds: number): number {
  const { amount, period } = salaryData;
  const totalPeriodSeconds = periodSeconds[period];
  
  // 每秒收入 = 总收入 / 周期总秒数
  const perSecond = amount / totalPeriodSeconds;
  
  // 总收入 = 每秒收入 × 已经过的秒数
  return perSecond * seconds;
}

/**
 * 格式化货币显示
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = currencySymbols[currencyCode] || '';
  
  // 对于金额极小的数值，使用科学计数法可能更合适
  if (amount < 0.01 && amount > 0) {
    return `${symbol}${amount.toFixed(8)}`;
  }
  
  // 常规格式化，保留两位小数
  return `${symbol}${amount.toFixed(2)}`;
}