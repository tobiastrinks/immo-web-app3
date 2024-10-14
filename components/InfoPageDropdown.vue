<template>
  <div ref="wrapper" class="info-page-dropdown">
    <BlueArrow class="info-page-dropdown-arrow" type="TO_BOTTOM_LEFT" :text="$t('_shared.infoPage.dropdown.arrowLabel')" />
    <div
      v-for="(item, index) in items"
      :key="index"
      class="info-page-dropdown-item"
    >
      <div
        class="info-page-dropdown-item-head"
        :class="{ opened: isOpened(index) }"
        @click="switchItem(index)"
      >
        <h3 class="info-page-dropdown-item-head-label">
          {{ item.label }}
        </h3>
        <div class="info-page-dropdown-item-head-icon">
          <img
            v-if="isOpened(index)"
            src="@/assets/img/_shared/font-awesome/minus-solid-orange.svg"
            class="info-page-dropdown-item-head-icon-it"
          />
          <img
            v-else
            src="@/assets/img/_shared/font-awesome/plus-solid-orange.svg"
            class="info-page-dropdown-item-head-icon-it"
          />
        </div>
      </div>
      <div
        v-show="isOpened(index)"
        class="info-page-dropdown-item-content"
        :class="{ active: isOpened(index) }"
      >
        <CfArticle :content="item.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      openedIndex: [],
      activeScrollPos: 0,
      activeContentHeight: 0
    }
  },
  methods: {
    switchItem (index) {
      const existingIndex = this.openedIndex.indexOf(index)
      if (existingIndex !== -1) {
        this.openedIndex.splice(existingIndex, 1)
      } else {
        this.openedIndex.push(index)
      }
    },
    isOpened (index) {
      return this.openedIndex.includes(index)
    }
  }
}
</script>

<style scoped lang="scss">
.info-page-dropdown {
  position: relative;
  margin: 80px 0 40px;
  border-bottom: 1px solid $colorStroke;

  .info-page-dropdown-arrow {
    position: absolute;
    bottom: calc(100% + 10px);
    right: 130px;
  }

  .info-page-dropdown-item {

    .info-page-dropdown-item-head {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid $colorStroke;
      padding: 13px 20px;

      &:hover {
        cursor: pointer;

        .info-page-dropdown-item-head-label {
          transform: translateX(10px);
        }
      }

      &.opened {
        border-bottom: 1px solid $colorStroke;
      }

      .info-page-dropdown-item-head-label {
        transition: transform .4s;
      }

      .info-page-dropdown-item-head-icon {
        position: relative;
        width: 30px;
        height: 30px;
        border: 1px solid $colorStroke;
        border-radius: 30px;
        flex-shrink: 0;

        .info-page-dropdown-item-head-icon-it {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: $colorPrimary;
          width: 12px;
        }
      }
    }

    .info-page-dropdown-item-content {
      margin: 20px 20px 30px;
    }
  }
}
</style>
