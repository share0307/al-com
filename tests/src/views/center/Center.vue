<template>
  <div>
    <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="pending-deliver" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        待发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="我的积分" is-link />
      <van-cell icon="gold-coin" title="我的优惠券" is-link />
      <van-cell icon="gift" title="我收到的礼物" is-link />
    </van-cell-group>
    <van-button type="primary" @click.native="back">{{ $t('edit.backBtn') }}</van-button>
    <van-button type="primary" @click="changeLang">{{ $t('edit.backBtn') }}</van-button>
  </div>
</template>

<script>
import { Button, Row, Col, Icon, Cell, CellGroup } from 'vant';
import {Dialog, } from 'mand-mobile'

export default {
  components: {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    changeLang () {
      Dialog.alert({
        content: `点击了 ${name}`,
      })
      const lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
      utils.cache.set('AL_MOBILE_PALETTE', lang)
    }
  }
};
</script>

<style lang="scss">
.user {
  &-poster {
    width: 100%;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
