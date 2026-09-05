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
  name: 'Beauty Campaign',
  role: 'Social Media Design',
  image: '/hero-beauty-social.png',

  rotate: -11,
  offsetY: -18,
  overlap: 0,
  z: 10
},
{
  name: 'VOLT SNAP',
  role: 'Social Media Design',
  image: '/hero-camera-social.png',

  rotate: -6,
  offsetY: 36,
  overlap: -34,
  z: 14
},
{
  name: 'ÉLAN ROUGE',
  role: 'Email Design',
  image: '/hero-fashion-email.png',

  rotate: -3,
  offsetY: 10,
  overlap: -26,
  z: 12
},
{
  name: 'LADYBUG',
  role: 'Logo Design',
  image: '/hero-ladybug-logo.png',

  rotate: 2,
  offsetY: 28,
  overlap: -14,
  z: 11
},
{
  name: 'GRA',
  role: 'Web Design',
  image: '/hero-gra-web.png',

  rotate: 0,
  offsetY: -8,
  overlap: -30,
  z: 20,
  featured: true
},
{
  name: 'SKILLZY',
  role: 'Web Design',
  image: '/hero-skillzy-web.png',

  rotate: 4,
  offsetY: 22,
  overlap: -30,
  z: 11
},
{
  name: 'FRUIT BRANDING',
  role: 'Packaging Design',
  image: '/hero-fruit-branding.png',

  rotate: 8,
  offsetY: 6,
  overlap: -22,
  z: 13
},
{
  name: "LET'S RIDE",
  role: 'Logo Design',
  image: '/hero-lets-ride-logo.png',

  rotate: 12,
  offsetY: 32,
  overlap: -32,
  z: 12
}];
