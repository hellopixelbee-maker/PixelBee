export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
{
  quote:
  'We killed our design backlog in three weeks. Everything comes back tighter than the brief we wrote.',
  name: 'Marla Devine',
  role: 'Head of Brand, Northbeam',
  initials: 'MD'
},
{
  quote:
  'Cheaper than one junior designer and faster than the agency we used before. The queue keeps us honest about priorities.',
  name: 'Ivan Petrov',
  role: 'Founder, Kettle',
  initials: 'IP'
},
{
  quote:
  'Two days, every time. I stopped padding my launch timelines because of it.',
  name: 'Sara Okonjo',
  role: 'Marketing Lead, Fernway',
  initials: 'SO'
}];