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
              'padding-top': cell.paddingTop && `${cell.paddingTop}px`
            }"
          >
            <span v-if="cell.text" v-html="cell.text"></span>
            <Button
              v-else-if="cell.button"
              :label="cell.button"
              active
              no-scale-hover-effect
              inline-block
              small
              @click="$emit('button-click')"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.property-value-result-table {
  background-color: $colorLightGreyBg;
  padding: 20px;
  margin: 20px 0;

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

          &.bold {
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
