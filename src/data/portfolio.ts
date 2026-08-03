export type PortfolioCategory = 'Branding' | 'Web/UI' | 'Social Media' | 'Print';
export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
}
export const categories: Array<'All' | PortfolioCategory> = ['Branding', 'Web/UI', 'Social Media', 'Print'];
export const portfolioItems: PortfolioItem[] = [{
  id: 'identity-system',
  title: 'Stationery identity system',
  category: 'Branding',
  image: "/a9193a15-ecb2-4899-bdf9-a4e327c3e211.jpg"
}, {
  id: 'coffee-packaging',
  title: 'Coffee packaging suite',
  category: 'Branding',
  image: "/0b700aeb-ce72-41ff-a79f-0282fadfc653.jpg"
}, {
  id: 'saas-dashboard',
  title: 'Analytics dashboard',
  category: 'Web/UI',
  image: "/30260434-7798-4a11-a40e-4eae48ddc535.jpg"
}, {
  id: 'fintech-app',
  title: 'Fintech app screens',
  category: 'Web/UI',
  image: "/d7c9caa2-29a4-453e-9caa-cf023b7f2ab5.jpg"
}, {
  id: 'campaign-grid',
  title: 'Launch campaign grid',
  category: 'Social Media',
  image: "/83cd0c40-2e5d-4830-ae42-b1b2f7324efa.jpg"
}, {
  id: 'story-templates',
  title: 'Story template kit',
  category: 'Social Media',
  image: "/1cff21c5-2be9-4a96-8699-592733eacd3a.jpg"
}, {
  id: 'editorial-spread',
  title: 'Editorial spread',
  category: 'Print',
  image: "/ff477cbc-e127-41b4-ab0c-543dfcedad5e.jpg"
}, {
  id: 'poster-series',
  title: 'Event poster series',
  category: 'Print',
  image: "/35eaba5e-13a6-4c2f-b8af-09bb4dbadcc7.jpg"
}];