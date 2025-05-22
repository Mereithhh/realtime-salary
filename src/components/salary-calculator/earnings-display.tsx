import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SalaryData, currencySymbols, periodLabels, periodSeconds } from './types';
import { calculateEarnings, formatCurrency } from './utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface EarningsDisplayProps {
  salaryData: SalaryData;
  onReset: () => void;
}

export function EarningsDisplay({ salaryData, onReset }: EarningsDisplayProps) {
  const [earnings, setEarnings] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  
  // 计算每秒收入
  const earningsPerSecond = salaryData.amount / periodSeconds[salaryData.period];
  
  // 设置一个目标时间，显示进度条（例如显示1小时内的进度）
  const targetTime = 60 * 60 * 1000; // 1小时，毫秒
  
  // 进度百分比，最大100%
  const progressPercent = Math.min((elapsedTime / targetTime) * 100, 100);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      setElapsedTime(elapsed);
      
      // 计算从开始到现在已经赚了多少钱
      const earned = calculateEarnings(salaryData, elapsed / 1000);
      setEarnings(earned);
    }, 50); // 更新频率更高，让数字看起来更流畅
    
    return () => clearInterval(timer);
  }, [salaryData, startTime]);
  
  const formattedEarnings = formatCurrency(earnings, salaryData.currency);
  const formattedPerSecond = formatCurrency(earningsPerSecond, salaryData.currency);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">您的收入正在增长</h3>
          <span className="text-sm text-muted-foreground">
            {periodLabels[salaryData.period]}: {currencySymbols[salaryData.currency]}{salaryData.amount.toLocaleString('zh-CN')}
          </span>
        </div>
        
        <div className="bg-secondary/50 p-6 rounded-lg flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground">已赚取</p>
          <p className="text-4xl font-bold tabular-nums">{formattedEarnings}</p>
          <p className="text-sm text-muted-foreground">
            每秒 {formattedPerSecond}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>计时中</span>
          <span className="tabular-nums">{formatTime(elapsedTime)}</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
      
      <div className="pt-2">
        <Button 
          variant="outline" 
          onClick={onReset} 
          className="w-full"
        >
          <ArrowLeftIcon className="mr-2" /> 重新设置
        </Button>
      </div>
    </div>
  );
}

// 格式化时间显示
function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}