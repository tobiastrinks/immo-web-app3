<template>
  <div>
    <div class="layout-default">
      <div class="layout-default-page">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  font-family: $fontPrimary;
  color: $colorText;
  font-size: 18px;
  line-height: 1.6;
  font-weight: 300;
}

h1, h2 {
  font-family: $fontHeadline;
  line-height: 1.4;
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 400;
}
h1 {
  font-size: 144%;
  font-weight: 600;

  @media #{$md} {
    font-size: 180%;
  }
}
h2 {
  font-size: 135%;
  font-weight: 600;
  line-height: 1.4;

  @media #{$md} {
    font-size: 150%;
  }
}
h3 {
  font-size: 120%;
  margin-bottom: 10px;
  line-height: 1.4em;
}

.inner {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;

  &.innerLarge {
    max-width: 1200px;
  }
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
input, select, textarea {
  font-size: 100%;
  color: $colorText;
  font-family: inherit;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::placeholder {
    color: $grey;
  }
}
textarea {
  resize: vertical;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
a:focus, button:focus {
  outline: none;
}
button::-moz-focus-inner {
  border: 0;
}
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}
a, button, input, select, textarea {
  -webkit-tap-highlight-color: transparent;
}

img {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

pre {
  font-family: inherit;
  white-space: pre-wrap;
}

hr {
  border: none;
  height: 1px;
  background-color: $colorStroke;
  margin: 0;
}

::selection {
  background: $colorPrimary;
  color: #fff
}

strong, b {
  font-weight: 400;
}



/***
  TRANSITIONS
 */

.scale-fade-enter-active, .scale-fade-leave-active {
  transition: all .3s ease;

  *[data-transition=subject] {
    transition: all .3s ease;
  }
}
.scale-fade-enter, .scale-fade-leave-to {
  opacity: 0;

  *[data-transition=subject] {
    transform: scale(.7);
  }
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


@keyframes rotate{
  to { transform: rotate(360deg); }
}

caption {
  -webkit-text-size-adjust: none;
}

.layout-default {
  position: relative;
  margin-top: 80px;

  &.navNoteOpened {
    @media #{$lg} {
      margin-top: 108px;
    }
  }

  &.noMarginTop {
    margin-top: 0;

    &.navNoteOpened {
      @media #{$lg} {
        margin-top: 28px;
      }
    }
  }

  &:not(.isCalc) {
    min-height: 100vh;
  }

  @media #{$lg} {
    margin-top: 67px;
  }

  .layout-default-page {

    &.loading {
      display: none;
    }
  }
}
</style>
<script setup lang="ts">
</script>
