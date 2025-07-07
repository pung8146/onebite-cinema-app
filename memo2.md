# 데이터 캐시

불 필요한 데이터 요청의 수를 줄여서 웹 서비스의 성능을 크게 개선할 수 있음

## Next 에서 사용법

기존 데이터 페칭 방식에서 {cache} 옵션을 추가해서 캐시 설정을 할 수 있음

```ts
const response = await fetch(`~api`, { cache: "force-cache" });
```

## 캐시 정책

- force-cache : 요청의 결과를 무조건 캐싱함 , 한번 호출 된 이후에는 다시는 호출 되지 않음
- no-store : 데이터 페칭의 결과를 저장하지 않는 옵션(저장을 안함), 캐싱을 아예 하지 않도록 설정하는 옵션임, **14버전이후 no-store 옵션이 기본값이 됨**
- no-cache : 캐시 데이터 사용 안함
- only-if-cached : 캐시 데이터 사용 안함

### 캐시 정책 주의사항

axios 에서는 캐시 정책을 지원하지 않음 ** 무조건 fetch 를 사용해야 함 **

** Next 에서 fetch 의 확장판 개념 **

#### logging 옵션

next.config.js 에서 설정 가능하며
fetch 의 요청 정보를 콘솔에 출력해줌

```mjs
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
```

서버콘솔에서 출력

```bash
GET https://onebite-cinema-api-main-ecru.vercel.app/movie/random 200 in 3884ms (cache skip)
Cache skipped reason: (auto no cache)
```
