# 병렬 라우트 (Parallel Route)

- 하나의 화면 안에 여러개의 페이지를 벙렬로 보여주는 기능입니다.
- 주로 SNS 서비스 , CMS 서비스 등에서 사용됩니다.

## slot(slot)

- 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더
- 파일앞에 @ 기호를 붙여서 파일을 구분합니다.

# 인터셉팅 라우트 (Intercepting Route)

- 사용자가 특정 경로로 접속해서 이렇게 새로운 페이지를 요청할 때 이 요청을 가로채서 원래 랜더링 돼야 되는 페이지가 아닌 우리가 원하는 어떠한 페이지를 대신 랜더링하도록 설정하는 라우팅 패턴입니다.
- 동일한 경로를 접속하더라도 특정 조건을 만족하게 되면 그때 에는 원래 페이지가 아닌 다른 페이지를 랜더링 시킵니다.
- 특정 조건은 Next에서 고정적으로 초기 접속 요청이 아닐때에만 인터셉팅 라우트가 동작합니다.

## 사용 방법

src/app/(.)movie/[id]

- ()는 인터셉팅 라우트 패턴입니다.
- .은 상대 경로를 의미합니다.
