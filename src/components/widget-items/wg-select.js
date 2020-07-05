import Utils from '@/utils/index'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      column: []
    }
  },
  methods: {
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [this.column],
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal) {
      this.item.value = selectedVal[0]
    }
  },
  created() {
    this.column = this.item.options.map(v => ({ text: v, value: v }))
  },
  render() {
    const { item } = this;
    const wrapClass = ['wg-item', item.label.labelPosition === 'top' ? 'flex-column' : 'align-middle'];
    return (
      <div class={wrapClass} style={item.style}>
        <div
          class="wg-title"
          v-show={item.showLabel}
          style={{ width: Utils.changeRem(item.label.labelwidth) }}
        >{item.label.labelTitle}</div>
        <div class="flex-auto">
          <div
            id={item.key}
            placeholder={item.placeholder}
            class="wg-select flex align-middle"
            readonly
            onClick={this.showPicker} >
            {item.value ? item.value : item.placeholder}
            <i class="cubeic-select"></i>
          </div>
        </div>
      </div>
    )
  }
}
