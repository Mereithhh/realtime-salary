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

// 薪资预设方案
export const salaryPresets = [
  { label: '月薪1万', amount: 10000, period: 'monthly' as Period },
  { label: '月薪2万', amount: 20000, period: 'monthly' as Period },
  { label: '年薪50万', amount: 500000, period: 'yearly' as Period },
  { label: '年薪100万', amount: 1000000, period: 'yearly' as Period },
  { label: '年薪一个亿', amount: 100000000, period: 'yearly' as Period },
  { label: '存款一个亿(年化2%)', amount: 2000000, period: 'yearly' as Period, description: '一亿存款年化2%的利息收入' },
  { label: '躺着赚一个亿', amount: 100000000, period: 'yearly' as Period, description: '每年躺着就能赚一个亿，人生赢家！' }
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