<script setup>
const TABLE_ID = {
  PROPERTY_VALUE_OVERVIEW: 'PROPERTY_VALUE_OVERVIEW',
  PROPERTY_VALUE_COMPARISON_EXAMPLE: 'PROPERTY_VALUE_COMPARISON_EXAMPLE'
}
const TABLE_DESCRIPTION_KEY = {
  PROPERTY_VALUE_OVERVIEW: '_shared.infoPage.tables.propertyValueOverview.description',
  PROPERTY_VALUE_COMPARISON_EXAMPLE: '_shared.infoPage.tables.propertyValueComparisonExample.description'
}

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const i18n = useI18n()

const description = computed(() => {
  return i18n.t(TABLE_DESCRIPTION_KEY[props.id])
})
</script>

<template>
  <div class="cf-page-table">
    <table v-if="props.id === TABLE_ID.PROPERTY_VALUE_OVERVIEW" :class="TABLE_ID.PROPERTY_VALUE_OVERVIEW">
      <caption>
        <p v-if="description" class="cf-page-table-description">
          {{ description }}
        </p>
      </caption>
      <thead>
        <tr
          v-for="(tr, i) in $tm('_shared.infoPage.tables.propertyValueOverview.head')"
          :key="i"
        >
          <th
            v-for="(th, i2) in tr"
            :key="i2"
            :rowspan="i === 0 && i2 === 0 ? 2 : 1"
            :colspan="i === 0 && i2 === 1 ? 3 : 1"
          >
            <pre>{{ th }}</pre>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tr, i) in $tm('_shared.infoPage.tables.propertyValueOverview.main')"
          :key="i"
        >
          <td
            v-for="(td, i2) in tr"
            :key="i2"
          >
            <pre>{{ td }}</pre>
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="props.id === TABLE_ID.PROPERTY_VALUE_COMPARISON_EXAMPLE" :class="TABLE_ID.PROPERTY_VALUE_COMPARISON_EXAMPLE">
      <caption>
        <p v-if="description" class="cf-page-table-description">
          {{ description }}
        </p>
      </caption>
      <thead>
        <tr>
          <th
            v-for="(th, i) in $tm('_shared.infoPage.tables.propertyValueComparisonExample.head')"
            :key="i"
          >
            <pre>{{ th }}</pre>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tr, i) in $tm('_shared.infoPage.tables.propertyValueComparisonExample.main')"
          :key="i"
        >
          <td
            v-for="(td, i2) in tr"
            :key="i2"
          >
            {{ td }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.cf-page-table {
  margin: 40px 0;
  overflow-x: scroll;
  width: 100%;

  table {
    border-collapse: collapse;
    text-align: center;

    caption {
      caption-side: bottom;

      .cf-page-table-description {
        margin-top: 15px;
        font-size: 90%;
        text-align: left;
      }
    }

    th, td {
      border: 1px solid $colorStroke;
      padding: 8px 15px;
    }

    thead {
      background-color: $colorLightGreyBg;

      th {
        font-weight: 400;
        vertical-align: top;

        &:first-child {
          text-align: left;
        }
      }
    }

    tbody {
      td:first-child {
        text-align: left;
      }
    }

    pre {
      margin: 0;
    }

    &.PROPERTY_VALUE_OVERVIEW {

      tr:last-child th {
        font-weight: 300;
      }
    }

    &.PROPERTY_VALUE_COMPARISON_EXAMPLE {

      tbody {
        tr:last-child td {
          background-color: $colorLightGreyBg;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
