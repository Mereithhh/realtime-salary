export interface SalaryData {
  amount: number;
  period: Period;
  currency: string;
  workingHours: number;
  includeHolidays: boolean;
}

export type Period = 'yearly' | 'monthly' | 'weekly' | 'hourly';

export const periodLabels: Record<Period, string> = {
  yearly: '年薪',
  monthly: '月薪',
  weekly: '周薪',
  hourly: '时薪'
};

// 一年工作日计算：365天 - 104天周末 - 11天法定节假日 = 250天
export const WORKING_DAYS_PER_YEAR = 250;
export const HOLIDAYS_PER_YEAR = 11; // 中国法定节假日
export const WEEKENDS_PER_YEAR = 104; // 52周 × 2天

export const periodSeconds: Record<Period, (workingHours: number, includeHolidays: boolean) => number> = {
  yearly: (workingHours, includeHolidays) => {
    const workingDays = includeHolidays ? 365 : WORKING_DAYS_PER_YEAR;
    return workingDays * workingHours * 3600;
  },
  monthly: (workingHours, includeHolidays) => {
    const workingDays = includeHolidays ? 30 : 21; // 每月平均21个工作日
    return workingDays * workingHours * 3600;
  },
  weekly: (workingHours) => 5 * workingHours * 3600, // 每周5个工作日
  hourly: () => 3600 // 1小时
};

export const currencySymbols: Record<string, string> = {
  'CNY': '¥',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥'
};