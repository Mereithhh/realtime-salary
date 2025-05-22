export interface SalaryData {
  amount: number;
  period: Period;
  currency: string;
  workingHours: number;
  holidayDays: number;
}

export type Period = 'yearly' | 'monthly' | 'weekly' | 'hourly';

export const periodLabels: Record<Period, string> = {
  yearly: '年薪',
  monthly: '月薪',
  weekly: '周薪',
  hourly: '时薪'
};

// 预设的节假日方案
export const holidayPresets = [
  { label: '中国标准（115天）', value: 115 }, // 104天周末 + 11天法定节假日
  { label: '无节假日', value: 0 },
  { label: '自定义', value: 'custom' }
] as const;

// 一年工作日计算：365天 - 节假日天数
export const periodSeconds: Record<Period, (workingHours: number, holidayDays: number) => number> = {
  yearly: (workingHours, holidayDays) => {
    const workingDays = 365 - holidayDays;
    return workingDays * workingHours * 3600;
  },
  monthly: (workingHours, holidayDays) => {
    const workingDays = 30 - Math.round(holidayDays / 12); // 每月平均节假日
    return workingDays * workingHours * 3600;
  },
  weekly: (workingHours, holidayDays) => {
    const workingDays = 7 - Math.round(holidayDays / 52); // 每周平均节假日
    return workingDays * workingHours * 3600;
  },
  hourly: () => 3600 // 1小时
};

export const currencySymbols: Record<string, string> = {
  'CNY': '¥',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥'
};