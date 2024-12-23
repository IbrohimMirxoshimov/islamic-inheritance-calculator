import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AppRoutes from '@/routes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { InheritanceProvider } from '@/contexts/InheritanceContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="inheritance-calc-theme">
      <LanguageProvider>
        <InheritanceProvider>
          <Router>
            <AppRoutes />
            <Toaster />
          </Router>
        </InheritanceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;