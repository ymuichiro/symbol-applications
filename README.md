## 検証するべきこと

SSR と SSG を混ぜた構成とは
https://nextjs.org/docs/basic-features/pages

最終的なサイズ感
Vercel やってみる？

pwa background push（mobile）

## SSG

データなしの静的生成
デフォルトでは、Next.js はデータを取得せずに静的生成を使用してページを事前にレンダリングします。次に例を示します。

```js
function About() {
  return <div>About</div>;
}

export default About;
```

## SSR

```js
export default function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
```

## twitter sdk

https://developer.twitter.com/en/docs/twitter-api/tools-and-libraries/sdks/overview#item1
