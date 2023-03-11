<template>
  <IxText copyable>iDux (copyable)</IxText>
  <IxText copyable ellipsis>
    Lorem ipsum dolor sit <IxText type="success">iDux (success)</IxText> amet eligendi eum eveniet esse reprehenderit
    quae labore aspernatur ullam beatae, dolorem a enim tempore non amet nobis numquam adipisci! Fuga.
  </IxText>
  <IxSwitch v-model:checked="expanded"></IxSwitch>
  <IxText :ellipsis="expandedEllipsis" copyable>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. eligendi eum eveniet esse reprehenderit quae labore
    aspernatur ullam beatae, dolorem a enim tempore non amet nobis numquam adipisci! Fuga.
  </IxText>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const expanded = ref(false)

const expandedEllipsis = computed(() => ({
  rows: 2,
  expanded: expanded.value,
  onExpand: () => {
    console.log('onExpand:', expanded.value)
  },
}))
</script>
