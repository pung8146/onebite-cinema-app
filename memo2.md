# 데이터 캐시

불 필요한 데이터 요청의 수를 줄여서 웹 서비스의 성능을 크게 개선할 수 있음

## Next 에서 사용법

기존 데이터 페칭 방식에서 {cache} 옵션을 추가해서 캐시 설정을 할 수 있음

```ts
const response = await fetch(`~api`, { cache: "force-cache" });
```

## 캐시 정책

- force-cache : 요청의 결과를 무조건 캐싱함 , 한번 호출 된 이후에는 다시는 호출 되지 않음, ** 캐시가 없으면 서버에 요청을 보냄 **
- no-store : 데이터 페칭의 결과를 저장하지 않는 옵션(저장을 안함), 캐싱을 아예 하지 않도록 설정하는 옵션임, ** 14버전이후 no-store 옵션이 기본값이 됨 **
- next : {revalidate: 3} : 특정 시간을 (숫자second)주기로 캐시를 업데이트 함 , 마치 Page Router 의 ISR 방식과 유사 함 // STALE(이전 데이터) 사용 이후 서버에 요청을 보냄

### 캐싱된 데이터

캐싱된 데이터는 json형태로 next서버안에 보관됩니다.

.next/cache/ 폴더에 저장됨

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
GET https://api.com/movie/random 200 in 3884ms (cache skip) // no-store 옵션 사용시
Cache skipped reason: (auto no cache)

GET https://api.com/movie/random 200 in 8ms (cache hit) // force-cache 옵션 사용시
```
