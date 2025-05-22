import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Period, SalaryData, periodLabels, holidayPresets, salaryPresets } from './types';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover';

const formSchema = z.object({
  amount: z.string().min(1, { message: '请输入薪资金额' }).refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    { message: '请输入有效的数字' }
  ),
  period: z.enum(['yearly', 'monthly', 'weekly', 'hourly']),
  currency: z.string().min(1, { message: '请选择货币' }),
  workingHours: z.string().min(1, { message: '请输入工作时间' }).refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0 && parseFloat(val) <= 24,
    { message: '请输入1-24之间的有效工作时间' }
  ),
  holidayPreset: z.string(),
  customHolidays: z.string().optional()
});

interface SalaryFormProps {
  onSubmit: (data: SalaryData) => void;
}

export function SalaryForm({ onSubmit }: SalaryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomHolidays, setShowCustomHolidays] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      period: 'yearly',
      currency: 'CNY',
      workingHours: '8',
      holidayPreset: '115',
      customHolidays: ''
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const holidayDays = values.holidayPreset === 'custom' 
      ? parseInt(values.customHolidays || '0')
      : parseInt(values.holidayPreset);

    setTimeout(() => {
      onSubmit({
        amount: parseFloat(values.amount),
        period: values.period as Period,
        currency: values.currency,
        workingHours: parseFloat(values.workingHours),
        holidayDays
      });
      setIsSubmitting(false);
    }, 400);
  }

  function handlePresetSelect(preset: typeof salaryPresets[number]) {
    form.setValue('amount', preset.amount.toString());
    form.setValue('period', preset.period);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                薪资金额
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">快速选择</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3" align="end">
                    <div className="grid gap-2">
                      {salaryPresets.map((preset) => (
                        <PopoverClose key={preset.label} asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-auto w-full justify-start px-2 py-1.5"
                            onClick={() => handlePresetSelect(preset)}
                          >
                            <div className="text-left">
                              <div className="font-medium">{preset.label}</div>
                              {preset.description && (
                                <div className="text-xs text-muted-foreground">{preset.description}</div>
                              )}
                            </div>
                          </Button>
                        </PopoverClose>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </FormLabel>
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

        <FormField
          control={form.control}
          name="workingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>每天工作时间（小时）</FormLabel>
              <FormControl>
                <Input 
                  placeholder="例如：8" 
                  type="number" 
                  min="1"
                  max="24"
                  step="0.5"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="holidayPreset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>节假日设置</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setShowCustomHolidays(value === 'custom');
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择节假日方案" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {holidayPresets.map((preset) => (
                    <SelectItem key={preset.value.toString()} value={preset.value.toString()}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showCustomHolidays && (
          <FormField
            control={form.control}
            name="customHolidays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自定义节假日天数</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="输入年度节假日总天数" 
                    type="number" 
                    min="0"
                    max="365"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
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