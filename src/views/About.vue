<template>
  <v-card class="highlight-top pa-4 mb-8 elevation-2">
    <h2 class="mb-2 text-h5">{{ $t('about.project.title') }}</h2>
    <p class="text-body-1">
      {{ $t('about.project.text1') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.project.text2') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.project.text3') }}
    </p>
  </v-card>
  <v-card class="highlight-top pa-4 mb-8 elevation-2">
    <h2 class="mb-4 text-h5">{{ $t('about.tech.title') }}</h2>
    <p class="text-body-1">
      {{ $t('about.tech.text1') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.tech.text2') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.tech.text3') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.tech.text4') }}
    </p>
    <p class="text-body-1">
      {{ $t('about.tech.text5') }}
      <a
        class="text-link"
        href="https://github.com/lucasferreiralimax/wallet-digital"
        target="_blank"
      >
        {{ $t('about.tech.text6') }}
      </a>
    </p>
    <p class="text-body-1">
      {{ $t('about.tech.text7') }}
    </p>
  </v-card>
  <v-card class="highlight-top pa-4 mb-8 elevation-2">
    <h2 class="mb-4 text-h5">{{ $t('about.objective.title') }}</h2>
    <ol class="list">
      <li>{{ $t('about.tech.text1') }}</li>
      <li>{{ $t('about.tech.text2') }}</li>
    </ol>
  </v-card>
</template>
