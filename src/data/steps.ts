import { ListTodoIcon, MessageSquareIcon, PackageIcon } from 'lucide-react';
import type { Step } from '../types/steps';

export const steps: Step[] = [
  {
    id: 'contact',
    number: '01',
    title: 'დაგვიკავშირდი',
    description:
      'შეავსე მოკლე საკონტაქტო ფორმა და მოგვწერე შენი პირველი დიზაინის საჭიროების შესახებ.',
    detail:
      'მოთხოვნას გავეცნობით და 24 საათის განმავლობაში თავად დაგიკავშირდებით.',
    icon: MessageSquareIcon,
    glowFrom: '#ffd66b',
    glowTo: '#ff4d3d',
  },
  {
    id: 'request',
    number: '02',
    title: 'მოითხოვე დიზაინი',
    description:
      'გამოგვიგზავნე დიზაინის მოთხოვნა და დაალაგე პრიორიტეტების მიხედვით.',
    detail:
      'შენ განსაზღვრავ რა არის მნიშვნელოვანი — ჩვენ კი სწორედ იმ თანმიმდევრობით ვმუშაობთ.',
    icon: ListTodoIcon,
    glowFrom: '#5eb8ff',
    glowTo: '#6a2bff',
  },
  {
    id: 'receive',
    number: '03',
    title: 'ჩაიბარე მზა დიზაინი',
    description: 'მიიღე დასრულებული დიზაინი 2–3 სამუშაო დღეში და გადახედე შედეგს.',
    detail:
      'შეუზღუდავი კორექტირებები, სანამ საბოლოო შედეგით სრულად კმაყოფილი არ იქნები.',
    icon: PackageIcon,
    glowFrom: '#ffb3c9',
    glowTo: '#ff5b4a',
  },
];
