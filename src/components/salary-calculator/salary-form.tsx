import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Period, SalaryData, periodLabels } from './types';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  amount: z.string().min(1, { message: '请输入薪资金额' }).refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: '请输入有效的数字' }
  ),
  period: z.enum(['yearly', 'monthly', 'weekly', 'hourly']),
  currency: z.string().min(1, { message: '请选择货币' })
});

interface SalaryFormProps {
  onSubmit: (data: SalaryData) => void;
}

export function SalaryForm({ onSubmit }: SalaryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      period: 'yearly',
      currency: 'CNY'
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // 模拟提交延迟，增加用户体验
    setTimeout(() => {
      onSubmit({
        amount: parseFloat(values.amount),
        period: values.period as Period,
        currency: values.currency
      });
      setIsSubmitting(false);
    }, 400);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>货币类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择货币" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CNY">人民币 (¥)</SelectItem>
                  <SelectItem value="USD">美元 ($)</SelectItem>
                  <SelectItem value="EUR">欧元 (€)</SelectItem>
                  <SelectItem value="GBP">英镑 (£)</SelectItem>
                  <SelectItem value="JPY">日元 (¥)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>薪资金额</FormLabel>
              <FormControl>
                <Input 
                  placeholder="例如：120000" 
                  type="number" 
                  min="1"
                  step="any" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>计算周期</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择周期" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(periodLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          开始计算 <ArrowRightIcon className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}