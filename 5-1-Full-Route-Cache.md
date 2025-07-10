# 풀 라우트 캐시 (Full-Route-Cache)

Next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능

A라는 페이지가 풀라우트 캐시로 저장되어있는 페이지로 설정되어있다면

A 페이지의 필요한 정보들을 (리퀘스트 메모리 제이션 이나 데이터 캐싱) 거쳐서

결과적으로 랜더링을 완료하게 되면 ** 풀라우트 캐시 ** 로 서버에 저장하게 됩니다.

이후 빌드 타임이 끝났을 경우 빌드 타임에 저장된 (캐쉬된) 페이지를 사용자에게 전달하게 됩니다.

SSG 처럼 정적으로 페이지를 다만들어놓고 캐시에 보관한 다음 브라우저에 요청이 들어왔을때 캐시에 저장된 페이지를 그대로 응답해주는 페이징 캐싱 기능입니다.

## Daynamic Page 로 설정되는 기준

- 특정 페이지가 접속 요청을 받을 때 마다 매번 변화가 생기거나, 데이터가 달라지는 경우

### 1. 캐쉬되지 않는 Data Fetching 을 사용할 경우

```jsx
async function Component() {
    const response = await fetch(`https://api.example.com/data`,{
        cache:'no-store'
    });
    const data = await response.json();
    return <div>{...}</div>
}
```

해당 컴포넌트를 사용하는 페이지는 자동으로 동적 다이나믹 페이지로 설정이 됩니다.

### 2. 동적함수(쿠키,헤더,쿼리스트링)을 사용 하는 컴포넌트가 있을때

동적 함수를 사용하는 컴포넌트를 사용중이라면 해당 페이지는 자동으로 동적 다이나믹 페이지로 설정됩니다.

```jsx
import {cookies} from 'next/headers'

async function Component() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('cookie-name');
    return <div>{...}</div>
}
```

```jsx
import {headers} from 'next/headers'

async function Component() {
    const headersList = await headers();
    const header = headersList.get('header-name');
    return <div>{...}</div>
}
```

```jsx
async function Component() {
    const searchParams = await searchParams();
    const searchParam = searchParams.get('search-param-name');
    return <div>{...}</div>
}
```

## Static Page로 설정되는 기준

- Dynamic Page가 아니면 모두 Static Page가 된다 (default)

## Suspense

```jsx
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
```

- Suspense 를 사용하면 컴포넌트 사전 렌더링 과정에서는 배제되고 오직 클라이언트측에서만 렌더링이 됩니다

- 미결(미완성) 뜻으로 Suspense 는 렌더링을 미루는 컴포넌트 입니다.
- Suspense 안에 컴포넌트가 비동기 작업이 끝날때까지 미완성 상태로 남아있습니다.

## generateStaticParams

- 페이지 렌더링 전에 미리 정적 페이지를 생성하는 함수
- url 파라미터 값을 미리 정의해놓고 렌더링 할 수 있게 해줍니다.
- 파라미터는 문자열 배열 형태로 정의해야 합니다.
- 데이터 캐싱을 설정하지않더라도 해당 되는 페이지는 ** 정적 페이지 ** 로 설정됩니다.
- page router 에서는 getStaticPaths 함수와 유사합니다

```jsx
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
```

### dynamicParams

- 값이 false 일 경우 정해진 파라미터 값만 허용 하는 옵션입니다.
