import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  // Sonni yaxlitlaymiz
  const roundedNum = Math.round(num);

  // Rus formatida chiqaramiz
  return roundedNum.toLocaleString('ru');
}
