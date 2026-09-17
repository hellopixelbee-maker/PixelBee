export interface PortfolioProject {
  id: string;
  title: string;
  cover: string;
  gallery: string[];
  galleryLayout?: 'long-form';
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  gallery: string[];
  galleryLayout?: 'long-form';
  projects?: PortfolioProject[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'branding',
    title: 'ბრენდირება',
    image: '/behance-darge-cover.png',
    gallery: [],
    projects: [
      {
        id: 'darge',
        title: 'DARGE',
        cover: '/behance-darge-cover.png',
        gallery: ['/branding-darge.webp'],
        galleryLayout: 'long-form',
      },
      {
        id: 'ladybug',
        title: 'LADYBUG',
        cover: '/behance-ladybug-cover.png',
        gallery: ['/branding-ladybug.webp'],
        galleryLayout: 'long-form',
      },
      {
        id: 'chai',
        title: 'ჩაი',
        cover: '/branding-chai-cover.webp',
        gallery: ['/branding-chai.webp'],
        galleryLayout: 'long-form',
      },
      {
        id: 'unipodcast',
        title: 'უნი პოდკასტი',
        cover: '/branding-unipodcast-cover.webp',
        gallery: ['/branding-unipodcast.webp'],
        galleryLayout: 'long-form',
      },
      {
        id: 'skillzy',
        title: 'SKILLZY',
        cover: '/branding-skillzy-cover.webp',
        gallery: ['/branding-skillzy.webp'],
        galleryLayout: 'long-form',
      },
    ],
  },
  {
    id: 'logo-design',
    title: 'ლოგო',
    image: '/behance-logofolio-cover.png',
    gallery: [
      '/behance-logofolio-01.webp',
      '/behance-logofolio-02.webp',
      '/behance-logofolio-03.webp',
      '/behance-logofolio-04.webp',
      '/behance-logofolio-05.webp',
      '/behance-logofolio-06.webp',
      '/behance-logofolio-07.webp',
      '/behance-logofolio-08.webp',
      '/behance-logofolio-09.webp',
      '/behance-logofolio-10.webp',
    ],
    galleryLayout: 'long-form',
  },
  {
    id: 'coffee-packaging',
    title: 'სოციალური მედიის დიზაინი',
    image: '/behance-social-media-cover.png',
    gallery: ['/social-media-works.webp'],
    galleryLayout: 'long-form',
  },
  {
    id: 'saas-dashboard',
    title: 'ვებ დიზაინი და UI/UX',
    image: '/behance-georgia-robotics-cover.png',
    gallery: [],
    projects: [
      {
        id: 'georgia-robotics',
        title: 'GEORGIA ROBOTICS ASSOCIATION',
        cover: '/behance-georgia-robotics-cover.png',
        gallery: [
          '/behance-georgia-robotics-01.webp',
          '/behance-georgia-robotics-02.webp',
          '/behance-georgia-robotics-03.webp',
          '/behance-georgia-robotics-04.webp',
          '/behance-georgia-robotics-05.webp',
          '/behance-georgia-robotics-06.webp',
        ],
        galleryLayout: 'long-form',
      },
      {
        id: 'skillzy-uiux',
        title: 'SKILLZY',
        cover: '/behance-skillzy-uiux-cover.png',
        gallery: [
          '/behance-skillzy-uiux-01.webp',
          '/behance-skillzy-uiux-02.webp',
          '/behance-skillzy-uiux-03.webp',
          '/behance-skillzy-uiux-04.webp',
          '/behance-skillzy-uiux-05.webp',
          '/behance-skillzy-uiux-06.webp',
          '/behance-skillzy-uiux-07.webp',
          '/behance-skillzy-uiux-08.webp',
          '/behance-skillzy-uiux-09.webp',
        ],
        galleryLayout: 'long-form',
      },
    ],
  },
  {
    id: 'fintech-app',
    title: 'საბეჭდი მასალების დიზაინი',
    image: '/d7c9caa2-29a4-453e-9caa-cf023b7f2ab5.jpg',
    gallery: ['/d7c9caa2-29a4-453e-9caa-cf023b7f2ab5.jpg'],
  },
  {
    id: 'campaign-grid',
    title: 'ელ-ფოსტის დიზაინი',
    image: '/behance-email-designs-cover.png',
    gallery: ['/behance-email-designs-01.webp'],
    galleryLayout: 'long-form',
  },
  {
    id: 'story-templates',
    title: 'პრეზენტაციის შაბლონები',
    image: '/1cff21c5-2be9-4a96-8699-592733eacd3a.jpg',
    gallery: ['/1cff21c5-2be9-4a96-8699-592733eacd3a.jpg'],
  },
  {
    id: 'editorial-spread',
    title: 'სარეკლამო მასალები',
    image: '/ff477cbc-e127-41b4-ab0c-543dfcedad5e.jpg',
    gallery: ['/ff477cbc-e127-41b4-ab0c-543dfcedad5e.jpg'],
  },
  {
    id: 'poster-series',
    title: 'შეფუთვის დიზაინი',
    image: '/behance-packaging-design-cover.jpg',
    gallery: ['/behance-packaging-design-01.webp'],
    galleryLayout: 'long-form',
  },
  {
    id: 'concept-art',
    title: 'Concept Art',
    image: '/behance-host-cover.png',
    gallery: [],
    projects: [
      {
        id: 'host',
        title: 'HOST',
        cover: '/behance-host-cover.png',
        gallery: ['/behance-host-01.webp'],
        galleryLayout: 'long-form',
      },
      {
        id: 'daft-punks',
        title: 'DAFT PUNKS',
        cover: '/behance-daft-punks-cover.png',
        gallery: [
          '/behance-daft-punks-01.webp',
          '/behance-daft-punks-02.webp',
          '/behance-daft-punks-03.webp',
          '/behance-daft-punks-04.webp',
        ],
        galleryLayout: 'long-form',
      },
    ],
  },
  {
    id: 'fonts',
    title: 'ფონტები',
    image: '/behance-abja-font-cover.png',
    gallery: [],
    projects: [
      {
        id: 'abja-display-typeface',
        title: 'ABJA',
        cover: '/behance-abja-font-cover.png',
        gallery: [
          '/behance-abja-font-01.webp',
          '/behance-abja-font-02.webp',
          '/behance-abja-font-03.webp',
          '/behance-abja-font-04.webp',
          '/behance-abja-font-05.webp',
          '/behance-abja-font-06.webp',
          '/behance-abja-font-07.webp',
        ],
        galleryLayout: 'long-form',
      },
    ],
  },
];

