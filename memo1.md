# Next.js 데이터 페칭 정리

## 페이지 라우터(Page Router)

Next.js의 Page Router 방식에서 사용되는 데이터 페칭 방법입니다.

### 1. SSR (서버 사이드 렌더링)

매 요청마다 서버에서 데이터를 가져와 페이지를 렌더링합니다.

```ts
export async function getServerSideProps() {
  return {
    props: {
      /* 데이터 */
    },
  };
}
```

### 2. SSG (정적 사이트 생성)

빌드 시 데이터를 미리 가져와 정적 페이지로 생성합니다.

```ts
export async function getStaticProps() {
  return {
    props: {
      /* 데이터 */
    },
  };
}
```

### 3. ISR (Incremental Static Regeneration, 점진적 정적 재생성)

정적 페이지를 일정 시간마다 다시 생성합니다.

```ts
export async function getStaticProps() {
  return {
    props: {
      /* 데이터 */
    },
    revalidate: 60,
  };
}
```

### 사용 예시

데이터 페칭 후 페이지 컴포넌트에 프롭스로 전달합니다.

```ts
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

### 이러한 사용 이유

Page Router 방식에서는 서버 컴포넌트 개념이 없었습니다. 모든 컴포넌트가 클라이언트 컴포넌트였기 때문에 클라이언트에서 추가적인 JavaScript 실행이 발생했습니다.

## 앱 라우터(App Router) 데이터 페칭

Next.js 13부터 앱 라우터 방식이 추가되면서 서버 컴포넌트(Server Component)가 도입되었습니다. 서버 컴포넌트는 서버에서만 실행됩니다.

```ts
// 서버 컴포넌트 (+ async 함수 사용 가능)
export default async function Page() {
  const data = await fetch("...");

  return <div>{data}</div>;
}
```

## 클라이언트 컴포넌트에서 async 키워드를 사용하지 않는 이유

클라이언트 컴포넌트에서 async 키워드는 다음과 같은 문제로 인해 사용이 권장되지 않습니다.

### 1. 렌더링 지연 문제

브라우저는 async/await이 끝날 때까지 렌더링을 기다릴 수 없습니다. 데이터가 준비될 때까지 사용자에게 빈 화면(blank screen)을 보여주게 되어 UX 문제가 발생합니다.

### 2. React 컴포넌트는 Promise 반환 불가

React는 컴포넌트가 JSX를 반환할 것으로 기대합니다. async 함수는 항상 Promise를 반환하기 때문에 React의 렌더링 원칙과 충돌합니다.

```tsx
// 잘못된 예시
export default async function MyComponent() {
  const data = await fetchSomething();
  return <div>{data}</div>; // ❌ Promise를 반환
}
```

### 3. Hydration mismatch 위험

서버와 클라이언트에서 렌더링 결과가 달라지면 Hydration 오류가 발생할 수 있습니다. 이는 서버에서 미리 렌더링된 HTML과 클라이언트가 나중에 렌더링한 결과가 다를 때 생깁니다.

## 컴포넌트 내부에서 직접 fetch 사용 권장

Next.js 공식 문서에서는 데이터를 필요한 곳에서 직접 요청(Fetching data where it's needed)하는 것을 권장합니다.

```tsx
export default async function Page() {
  const data = await fetch("https://api.example.com/data").then((res) =>
    res.json()
  );

  return <div>{data.title}</div>;
}
```

이렇게 데이터를 컴포넌트 내부에서 직접 요청하는 방식은 코드의 직관성과 유지보수성을 높입니다.
