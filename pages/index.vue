<template>
  <div>
    <h2>
      {{ title }}
    </h2>
    <p>Bienvenue dans notre boutique.</p>
  </div>
</template>

<script>
export default {
  layout: 'bottom-menu',
  data() {
    return {
      title: 'Accueil'
    }
  },
}
</script>
