export interface SalaryData {
  amount: number;
  period: 'yearly' | 'monthly' | 'weekly' | 'hourly';
  currency: string;
}

export type Period = 'yearly' | 'monthly' | 'weekly' | 'hourly';

export const periodLabels: Record<Period, string> = {
  yearly: '年薪',
  monthly: '月薪',
  weekly: '周薪',
  hourly: '时薪'
};

export const periodSeconds: Record<Period, number> = {
  yearly: 365 * 24 * 60 * 60, // 一年的秒数
  monthly: 30 * 24 * 60 * 60,  // 一个月的秒数（按30天计算）
  weekly: 7 * 24 * 60 * 60,    // 一周的秒数
  hourly: 60 * 60              // 一小时的秒数
};

export const currencySymbols: Record<string, string> = {
  'CNY': '¥',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥'
};