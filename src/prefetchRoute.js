/* ── Route-chunk prefetching, called on link hover/touch for instant
   navigation. Own module so components never import App.jsx (which pulls
   in Layout → Navbar and would form a circular dependency). ── */
export const prefetchRoute = (path) => {
  switch (true) {
    case path.startsWith('/video/'):
      import('./pages/PlaylistVideo');
      break;
    case path === '/portfolio':
      import('./pages/Portfolio');
      break;
    case path === '/projects':
      import('./pages/Projects');
      break;
    case path === '/notes':
      import('./pages/Notes');
      break;
    case path === '/videos':
      import('./pages/Videos');
      break;
    case path === '/store':
      import('./pages/Store');
      break;
    case path === '/':
    default:
      import('./pages/MainSite');
      break;
  }
};
