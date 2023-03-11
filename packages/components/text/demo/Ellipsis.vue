<template>
  <IxText ellipsis>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem mollitia tempora placeat corrupti optio
    enim. Doloribus, quibusdam iure numquam labore ex sed deleniti. Maiores at iste nobis perferendis quia maxime!
  </IxText>

  <IxSwitch v-model:checked="expanded"></IxSwitch>
  <IxText :ellipsis="expandedEllipsis">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem mollitia tempora placeat corrupti optio
    enim. Doloribus, quibusdam iure numquam labore ex sed deleniti. Maiores at iste nobis perferendis quia maxime!
  </IxText>

  <IxText :ellipsis="tooltipEllipsis">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem mollitia tempora placeat corrupti optio
    enim. Doloribus, quibusdam iure numquam labore ex sed deleniti. Maiores at iste nobis perferendis quia maxime!
  </IxText>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const expanded = ref(false)

const expandedEllipsis = computed(() => ({
  rows: 1,
  expanded: expanded.value,
  onExpand: () => {
    console.log('onExpand:', expanded.value)
  },
}))

const tooltipEllipsis = {
  width: 200,
  tooltip:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam dolor consectetur tempore iure, nam recusandae placeat repellendus nihil sit dicta aut magni aspernatur? Maiores natus vitae blanditiis, impedit ut rerum.',
}
</script>
