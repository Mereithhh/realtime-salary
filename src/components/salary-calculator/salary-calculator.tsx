import { useState } from 'react';
import { SalaryForm } from './salary-form';
import { EarningsDisplay } from './earnings-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeToggle } from '../mode-toggle';
import { SalaryData } from './types';
import { Github } from 'lucide-react';
import { Button } from '../ui/button';

export function SalaryCalculator() {
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="relative">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/mereithhh/realtime-salary"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:no-underline"
            >
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub repository</span>
            </a>
          </Button>
          <ModeToggle />
        </div>
        <CardTitle className="text-2xl font-bold">实时工资计算器</CardTitle>
        <CardDescription>
          查看您每秒钟的收入，精确到小数点后两位
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!salaryData ? (
          <SalaryForm onSubmit={setSalaryData} />
        ) : (
          <EarningsDisplay 
            salaryData={salaryData} 
            onReset={() => setSalaryData(null)} 
          />
        )}
      </CardContent>
    </Card>
  );
}