export const CONFIG = {
  KAKAO_LINK: process.env.NEXT_PUBLIC_API_SHARE_KAKAO_LINK_KEY,
  API_END_POINT: process.env.NEXT_PUBLIC_API_END_POINT,
  API_CLOUD: process.env.NEXT_PUBLIC_API_CLOUD,
  CLINT: process.env.NEXT_PUBLIC_CLIENT,
  KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY,
} as const;