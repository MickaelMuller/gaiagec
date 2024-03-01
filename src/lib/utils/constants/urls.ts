const URLS = {
  HOME: '/',
  LOGIN: '/connexion',
  REGISTER: '/inscription',
  CHANGE_PASSWORD: '/changer-mot-de-passe',
  FORGET_PASSWORD: '/mot-de-passe-oublie',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/produits',
  PACKAGING: '/emballages',
  CERTIFICATES: '/certificats',
  SUPPLIERS: '/fournisseurs',
  ANALYTICS: '/analytics',
};

export const AUTHENTICATED_ROUTES = [
  URLS.DASHBOARD,
  URLS.PRODUCTS,
  URLS.PACKAGING,
  URLS.CERTIFICATES,
  URLS.SUPPLIERS,
  URLS.ANALYTICS,
];

export default URLS;
