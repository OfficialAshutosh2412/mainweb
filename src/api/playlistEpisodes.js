/**
 * Playlist episode index, keyed by the `slug` of each entry in
 * `mainWebsiteData.youtubeShowcase`.
 *
 * HOW THIS WAS BUILT
 * YouTube's only key-free, public machine-readable listing of a playlist
 * is its RSS feed:  /feeds/videos.xml?playlist_id=<PLAYLIST_ID>
 * That endpoint sends NO `Access-Control-Allow-Origin` header, so a
 * browser cannot call it directly and this project has no backend
 * (vercel.json rewrites every path to index.html) and must not ship an
 * API key in client code (see DOCS/RULES.md - Security).
 *
 * The feeds were therefore read once at authoring time and the result
 * baked in here as static data. This keeps the site a pure static build,
 * costs no API quota, and can never break at runtime.
 *
 * TO REFRESH: re-run the feeds for each playlistId and replace the
 * arrays below. The public URL for a playlist's feed is:
 *   https://www.youtube.com/feeds/videos.xml?playlist_id=PL...
 *
 * ORDERING: the feed returns newest-first, but the series reads
 * chronologically. Each showcase entry's `videoId` (the video you
 * designated as episode 1) is pinned to `n: 1` and the remainder are
 * sorted oldest-first, so numbering always matches how the series was
 * actually intended to be watched.
 */
export const playlistEpisodes = {
  "quality-management-system": [
      { n: 1, videoId: "fVX_f-Qq9Ls", title: "QMS Project Demo | Quality Management System Web Application | Full Stack Project", published: "2026-09-24" }
  ],
  "live-location-tracker-management": [
      { n: 1, videoId: "lIDUB4KGas4", title: "User Signup Flow in ASP.NET MVC – Step-by-Step for Location-Based Apps 🌍", published: "2025-10-04" },
      { n: 2, videoId: "gRXXBjV5_ks", title: "Login & Live Location Tracking in ASP.NET MVC | Location History + Auto Stop on Logout 🌍", published: "2025-10-04" },
      { n: 3, videoId: "vneBjNbYRlo", title: "Admin Dashboard Enhancement: View All Users’ Live Locations", published: "2025-10-05" }
  ],
  "fusionmart": [
      { n: 1, videoId: "rgtYnIyF1rk", title: "Introducing the FusionMart Project: A Modern ASP.NET MVC Web App", published: "2025-01-14" },
      { n: 2, videoId: "wUr21eHI9vk", title: "Adding Items to Cart: A Secure Feature for Logged-In Users in FusionMart", published: "2025-01-15" },
      { n: 3, videoId: "W_OFDMX2Nvc", title: "FusionMart Order Flow: Shipping Address, Payment, and Billing", published: "2025-01-16" },
      { n: 4, videoId: "R5Xy9u3WXPg", title: "Seller Workflow in FusionMart: Add Product & Admin Approval", published: "2025-01-24" },
      { n: 5, videoId: "B8BjlxFg5wQ", title: "How Sellers Request Product Deletion in FusionMart | Admin Review Process", published: "2025-03-21" }
  ],
  "sunrise-infotech-solution": [
      { n: 1, videoId: "t5_Lfldbm7g", title: "Sunrise Infotech Solution Web Application 🚀 | Built with ASP.NET MVC(End-User)", published: "2024-11-05" },
      { n: 2, videoId: "SQhgV9orjzs", title: "Showcasing Fresh UI with Signup & Login Features(End-User)", published: "2024-11-07" },
      { n: 3, videoId: "h1Zfh6kwlxU", title: "Sunrise Infotech Solution's Web App 🔐 | Data Management After Login(End-User)", published: "2024-11-09" },
      { n: 4, videoId: "bvF_cBIJYrk", title: "Unified Signup Experience in Sunrise Infotech Solution Web App  | User & Admin Signup Demo", published: "2024-11-12" },
      { n: 5, videoId: "OUu8fMix1tM", title: "Student/User Document Submission for Certificate Generation | Certificate Management", published: "2024-11-17" }
  ],
  "crime-tracking-system": [
      { n: 1, videoId: "cAhKgxAq99M", title: "Crime Tracking System (CTS) Project Homepage demo", published: "2024-02-06" },
      { n: 2, videoId: "UJL2quO6Uyw", title: "CTS - Contact Us form demo", published: "2024-02-06" },
      { n: 3, videoId: "ObM0o1-V2Kk", title: "CTS - Feedback form demo", published: "2024-02-06" },
      { n: 4, videoId: "xPyaaxgDXRQ", title: "CTS - Signup form demo", published: "2024-02-06" },
      { n: 5, videoId: "HF5unCdanC0", title: "CTS - Singup process for admin", published: "2024-02-07" },
      { n: 6, videoId: "DuG67tfNkSA", title: "CTS - Sign in for users and Admin using same form(Role management)", published: "2024-02-08" },
      { n: 7, videoId: "dBFYSFQLpW0", title: "CTS - filling crime complain using CTS portal project demo", published: "2024-02-08" },
      { n: 8, videoId: "-p9n-kw-RAM", title: "CTS - filling general complains project demo", published: "2024-02-09" },
      { n: 9, videoId: "ZRfR80wunJY", title: "CTS - filling missing person report online on CTS portal project demo", published: "2024-02-10" },
      { n: 10, videoId: "vv8vGLD65tU", title: "CTS - filling missing valuable report online on CTS project demo", published: "2024-02-11" },
      { n: 11, videoId: "VH6XUc4HCxg", title: "CTS - Admin Portal quick demo(project demo)", published: "2024-02-13" },
      { n: 12, videoId: "Hey8Pl0qSrk", title: "CTS - Admin: Show user information and adding new police station on database(project demo)", published: "2024-02-14" },
      { n: 13, videoId: "8KsDrD02Uzg", title: "CTS(Admin)-  Handle gallery section, contact us section, News section and how to change status.", published: "2024-02-16" }
  ]
};
