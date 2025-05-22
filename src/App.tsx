import { ThemeProvider } from '@/components/theme-provider';
import { SalaryCalculator } from '@/components/salary-calculator';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="salary-calculator-theme">
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
        <SalaryCalculator />
      </div>
    </ThemeProvider>
  );
}

export default App;