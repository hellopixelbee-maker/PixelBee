import type { LucideIcon } from 'lucide-react';

export type Step = {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  glowFrom: string;
  glowTo: string;
};