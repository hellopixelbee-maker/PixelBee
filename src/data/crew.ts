export type CrewMember = {
  name: string;
  role: string;
  image: string;
  rotate: number;
  offsetY: number;
  /** Negative horizontal pull (px) so neighbouring cards overlap. */
  overlap: number;
  /** Stacking order — higher cards sit in front. */
  z: number;
  featured?: boolean;
};

export const crew: CrewMember[] = [
{
  name: 'Julian Reyes',
  role: 'Engineering',
  image: "/2db10765-5f58-4682-b87f-992b1f8d9a3a.jpg",

  rotate: -11,
  offsetY: -18,
  overlap: 0,
  z: 10
},
{
  name: 'Marcus Hale',
  role: 'Customer Success',
  image: "/35d6212f-e92a-4d4c-9fbc-1fdc8ac71492.jpg",

  rotate: -6,
  offsetY: 36,
  overlap: -34,
  z: 14
},
{
  name: 'Elena Duarte',
  role: 'Brand & Design',
  image: "/9bceeb94-908d-41c6-bace-546233eb747c.jpg",

  rotate: -3,
  offsetY: 10,
  overlap: -26,
  z: 12
},
{
  name: 'Tom Berger',
  role: 'Product',
  image: "/34474527-b22c-4bcb-8231-8cead8a5ff75.jpg",

  rotate: 2,
  offsetY: 28,
  overlap: -14,
  z: 11
},
{
  name: 'Amara Okoye',
  role: 'Founder & CEO',
  image: "/7f92d8e3-1e7e-401a-820b-dc7b24449cec.jpg",

  rotate: 0,
  offsetY: -8,
  overlap: -30,
  z: 20,
  featured: true
},
{
  name: 'Finn Larsen',
  role: 'Growth',
  image: "/fcd605bc-47c2-433e-a2cc-311fe8728d8f.jpg",

  rotate: 4,
  offsetY: 22,
  overlap: -30,
  z: 11
},
{
  name: 'Nora Kelly',
  role: 'Operations',
  image: "/f31c11cf-5e1c-46e9-9547-8c22a0c00194.jpg",

  rotate: 8,
  offsetY: 6,
  overlap: -22,
  z: 13
},
{
  name: 'Sofia Marchetti',
  role: 'Content',
  image: "/c9c6202a-2756-4295-b47f-2bf54114c298.jpg",

  rotate: 12,
  offsetY: 32,
  overlap: -32,
  z: 12
}];