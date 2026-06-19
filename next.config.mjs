/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. GitHub Pages 배포를 위한 정적 내보내기 설정
  output: 'export',
  
  // 2. 하위 리포지토리 경로 설정 (앞뒤에 슬래시 '/' 확인)
  //basePath: '/pre',
  //assetPrefix: '/pre/',

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"]
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    // 주의: output: 'export' 환경에서는 Next.js 기본 <Image> 컴포넌트의 
    // 이미지 최적화 기능(unoptimized: true 설정 필요 가능성 있음)을 확인해야 할 수 있습니다.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: ""
      }
    ]
  }
};

export default nextConfig;
