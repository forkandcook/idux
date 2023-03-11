<template>
  <IxTooltip :ellipsis="{ width: 100, rows: 1 }" title="这个文字是我要省略的文字，省略到这串文字！嘻嘻嘻"></IxTooltip>
</template>

<style scoped>
p {
  width: 100px;
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
