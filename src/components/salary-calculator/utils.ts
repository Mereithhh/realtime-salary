import { Decimal } from 'decimal.js';
import { SalaryData, periodSeconds, currencySymbols } from './types';

/**
 * 计算给定时间内的收入
 */
export function calculateEarnings(salaryData: SalaryData, seconds: number): number {
  const { amount, period, workingHours, holidayDays } = salaryData;
  const totalPeriodSeconds = periodSeconds[period](workingHours, holidayDays);
  
  // 使用 Decimal 进行精确计算
  const amountDecimal = new Decimal(amount);
  const secondsDecimal = new Decimal(seconds);
  const totalSecondsDecimal = new Decimal(totalPeriodSeconds);
  
  // 每秒收入 = 总收入 / 周期总秒数
  const perSecond = amountDecimal.dividedBy(totalSecondsDecimal);
  
  // 总收入 = 每秒收入 × 已经过的秒数
  return perSecond.times(secondsDecimal).toNumber();
}

/**
 * 格式化货币显示
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = currencySymbols[currencyCode] || '';
  const amountDecimal = new Decimal(amount);
  
  // 对于金额极小的数值，使用科学计数法可能更合适
  if (amountDecimal.lessThan(0.01) && amountDecimal.greaterThan(0)) {
    return `${symbol}${amountDecimal.toFixed(8)}`;
  }
  
  // 常规格式化，保留两位小数
  return `${symbol}${amountDecimal.toFixed(2)}`;
}