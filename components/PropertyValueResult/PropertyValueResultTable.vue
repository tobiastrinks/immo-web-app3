<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="property-value-result-table">
    <div
      v-for="(section, index) in props.content.sections"
      :key="index"
      class="property-value-result-table-section"
    >
      <p class="property-value-result-table-section-title">
        {{ section.title }}
      </p>
      <p v-if="section.subTitle" class="property-value-result-table-section-sub-title">
        {{ section.subTitle }}
      </p>
      <table>
        <tr v-for="(row, index2) in section.rows" :key="index2">
          <td
            v-for="(cell, index3) in row"
            :key="index3"
            :class="{ bold: cell.bold }"
            :style="{
              'padding-top': cell.paddingTop && `${cell.paddingTop}px`,
              'padding-bottom': cell.paddingBottom && `${cell.paddingBottom}px`,
              'border-bottom': cell.borderBottom && '1px solid #D7D7D7FF'
            }"
          >
            <span v-if="cell.text" v-html="cell.text"></span>
          </td>
        </tr>
      </table>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.property-value-result-table {
  background-color: $colorLightGreyBg;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid $colorStroke;

  @media #{$sm} {
    padding: 20px;
  }

  .property-value-result-table-section {
    margin: 15px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    .property-value-result-table-section-title {
      font-weight: 500;
      font-size: 110%;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 8px 0;

      tr {

        td {
          padding: 0;
          width: 50%;
          vertical-align: top;

          &:first-child {
            padding-right: 3px;
          }

          &.bold {
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
