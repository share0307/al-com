<template>
  <div class="md-example-child md-example-child-input-item-2">
    <al-all-head :headBottom="headBottom">
      <!-- 头部信息 -->
      <div slot="head_bottom" class="fixedd" style="z-index:1000">
        <van-row>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
        </van-row>
      </div>
    </al-all-head>
    <al-content :headBottom="headBottom">
      <div slot="content">
        <div class="test_c">
          stylus样式引用测试PS蓝色背景--请忽略
        </div>
        <md-field>
          <md-input-item
            title="银行卡"
            type="bankCard"
            placeholder="bankCard xxxx xxxx xxxx xxxx"
            align="right"
          ></md-input-item>
          <md-input-item
            title="手机号"
            type="phone"
            v-model="phone"
            placeholder="phone xxx xxxx xxxx"
            error="手机号码位数有误"
            align="right"
          ></md-input-item>
          <md-input-item
            title="金额"
            type="money"
            v-model="money"
            @keydown="onInputKeydown"
            @change="onInputChange"
            placeholder="money xx, xxx.xxxx"
            align="right"
          ></md-input-item>
          <md-input-item
            title="数字"
            type="digit"
            v-model="digit"
            placeholder="digit 0123456789"
            align="right"
          ></md-input-item>
          <md-input-item
            title="密码"
            type="password"
            placeholder="password *********"
            align="right"
          ></md-input-item>
          <md-input-item
            title="邮箱"
            type="email"
            placeholder="其他标准 html input 类型"
            align="right"
          ></md-input-item>
        </md-field>

        <md-field title="包含内容的条目">
          <md-field-item
            name="item0"
            title="短标题"
            arrow="arrow-right"
            value="内容靠左展示"
            align="left"
            @click="onClick">
          </md-field-item>
          <md-field-item
            name="item1"
            title="一个不换行的长标题"
            arrow="arrow-right"
            value="内容居中展示"
            align="center"
            @click="onClick">
          </md-field-item>
          <md-field-item
            name="item2"
            title="一个换行的长标题"
            arrow="arrow-right"
            value="内容靠右展示"
            solid
            align="right"
            @click="onClick">
          </md-field-item>
          <md-field-item
            name="item2"
            title="左右插槽"
            arrow="arrow-right"
            solid
            align="right"
            @click="onClick">
            <div>内容展示</div>
            <md-icon name="bank-zs" slot="left"></md-icon>
            <md-icon name="circle-alert" slot="right"></md-icon>
          </md-field-item>
        </md-field>
      </div>
    </al-content>
  </div>
</template>

<style lang="stylus" scoped>
.test_c
  background-color color-primary-tap
.md-input-item .md-input-item-msg
  text-align 
</style>
<style lang="scss" scoped>
.fixedd {
  top: $headBottomTop;
  // z-index: $headIndex;
  left: 0;
  height: $headBottomTop;
  width: 100%;
  position: fixed;
  background-color: white;
}
</style>

<style>
.md-input-item .md-input-item-msg{
  text-align:right;
}
</style>

<script>
import { AllHead, Content } from "@/components"
import {Field, FieldItem, InputItem, Icon, Dialog} from 'mand-mobile'
import { Tab, Tabs, Row, Col } from 'vant';
// import '@examples/assets/images/bank-zs.svg'

export default {
  name: 'insured',
  /* DELETE */
  title: '业务场景输入框',
  titleEnUS: 'Business scenario input',
  /* DELETE */
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  data() {
    return {
      phone: '13321234431',
      money: '',
      digit: '',
      active: '0',
      headBottom: true,
    }
  },
  methods: {
    onClick(name) {
      Dialog.alert({
        content: `点击了 ${name}`,
      })
    },
    onInputKeydown(event) {
      console.log(`[Mand Mobile InputItem keydown] ${event.keyCode}`)
    },
    onInputChange(name, value) {
      console.log(`[Mand Mobile InputItem change] ${value}`)
    },
  },
}

</script>