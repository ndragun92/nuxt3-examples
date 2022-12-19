<template>
  <NuxtLayout>
    <Html lang="en">
      <Head>
        <Title>Nuxt 3 - Learn by Examples</Title>
        <Meta name="language" content="en" />
        <Meta
          name="keywords"
          content="nuxt, nuxt.js, nuxt3, vue, vue.js, vue3, examples, javascript, github, tailwind, TailwindCSS, coding, learning"
        />
        <Meta name="og:title" content="Nuxt 3 - Learn by Examples" />
        <Meta name="twitter:title" content="Nuxt 3 - Learn by Examples" />
        <Meta
          name="description"
          content="Nuxt 3 project with a lot of different examples."
        />
        <Meta
          name="og:description"
          content="Nuxt 3 project with a lot of different examples."
        />
        <Meta
          name="twitter:description"
          content="Nuxt 3 project with a lot of different examples."
        />
        <Meta name="og:image" content="/favicon.svg" />
        <Meta name="twitter:image" content="/favicon.svg" />
        <Meta name="og:site_name" content="/favicon.svg" />
        <Meta name="twitter:site" content="/favicon.svg" />
        <Meta
          name="url"
          :content="`https://nuxt-3-examples.vercel.app${$route?.path}`"
        />
        <Meta
          name="og:url"
          :content="`https://nuxt-3-examples.vercel.app${$route?.path}`"
        />
        <Link rel="icon" type="image/x-icon" href="/favicon.svg" />
        <Link rel="apple-touch-icon" type="image/svg" href="/favicon.svg" />
        <Link rel="apple-touch-startup-image" href="/favicon.svg" />
      </Head>
    </Html>
    <NuxtPage />
    <el-loading-intro />
  </NuxtLayout>
</template>
