export const config = {
  api: {
    baseUrl: process.env.TIP4SERV_API_BASE || 'https://api.store.mememc.club/v1',
    key: process.env.TIP4SERV_API_KEY || '',
  },
  app: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  features: {
    handleCustomerIdentification:
      (process.env.HANDLE_CUSTOMER_IDENTIFICATION || 'false').toLowerCase() === 'true',
  },
} as const;
