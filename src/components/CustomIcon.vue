<template>
  <svg
    class="custom-icon"
    aria-hidden="true"
    :style="`font-size: ${fontSize}px`"
    :class="$attrs.class"
  >
    <use :xlink:href="icon" />
  </svg>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    fontSize: {
      type: Number as PropType<number>,
      default: 16,
    },
  },
  setup(props) {
    return {
      icon: computed(() => `#ico-${props.name}`),
    }
  },
})
</script>

<style scoped lang="scss">
.custom-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  font-size: inherit;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
