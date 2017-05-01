<template>
    <div class="m-r-lg p-a grey-100" :class="{'active': selectedProvider}">
        <span class="provider-name">{{account.provider.name}}</span>
        <span class="text-danger" v-if="errorMsg">{{errorMsg}}</span>
        <span class="text-success" v-if="transferStatus">{{$t('member.transfer_status')}}</span>
        <div class="m-b-sm">
            <div class="input-group">
                <div class="form-control grey-100">
                    <span>{{$t('member.balance')}}:</span>
                    <strong class="text-success balance">{{account.balance | currency '￥'}}</strong>
                </div>
                <div class="input-group-btn">
                    <button class="btn btn-sm grey-600" @click="transfer(1)" :disabled="!validWithdraw || !selectedProvider">
                        <span v-if="!withdrawing">{{$t('member.pullout')}}</span>
                        <span v-else><i class='fa fa-circle-o-notch fa-spin'></i></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="m-b-sm">
            <form v-on:submit.prevent="transfer(2)">
                <div class="input-group">
                    <input class="form-control" :placeholder="$t('common.amount')" v-model="deposit.amount">
                    <div class="input-group-btn">
                        <button class="btn btn-sm grey-600" :disabled="!validTransfer || !selectedProvider">
                            <span v-if="!depositing">{{$t('common.transfer')}}</span>
                            <span v-else><i class='fa fa-circle-o-notch fa-spin'></i></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import api from '../api'
    export default {
        data () {
            return {
                deposit: {
                    amount: '',
                    provider: this.account.provider.code,
                    member: this.member.id
                },
                pullout: {
                    provider: this.account.provider.code,
                    member: this.member.id
                },
                depositing: false,
                withdrawing: false,
                errorMsg: '',
                transferStatus: false
            }
        },
        props: ['account', 'member', 'getmember', 'getaccounts', 'balanceloading', 'isactive'],
        computed: {
            validTransfer () {
                this.errorMsg = ''
                let amount = parseFloat(this.deposit.amount)
                let balance = this.member.balance.balance
                let amountRange = amount > 0 && amount <= balance
                return amountRange
            },
            validWithdraw () {
                this.errorMsg = ''
                let credits = this.account.balance
                let amountRange = credits > 0
                return amountRange
            },
            selectedProvider () {
                let provider = this.isactive
                let accountprovider = this.account.provider.name
                let active = accountprovider === provider
                return active
            }
        },
        methods: {
            transfer (type) {
                // type = 1 for pull out
                // type = 2 for deposit
                let data = type === 1 ? this.pullout : this.deposit
                this.loading(type, true)
                this.$http.put(api.gameaccounts + this.account.id + '/', data, {emulateJSON: true}).then(response => {
                    this.balanceloading = true
                    if (response.data.error) {
                        this.errorMsg = response.data.error
                    } else {
                        // show transfer status
                        this.transferStatus = true
                        this.loading(type, false)
                        // reload to update the balance
                        this.getmember(this.member.id)
                        setTimeout(() => {
                            this.transferStatus = false
                            this.getaccounts(this.member.id)
                            this.deposit.amount = ''
                        }, 3000)
                    }
                }, response => {
                    this.errorMsg = response.data.error
                })
            },
            loading (type, value) {
                if (type === 1) {
                    this.withdrawing = value
                } else {
                    this.depositing = value
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .provider-name {
        font-size: 14px;
    }
    .active {
        background: #dddddd;
    }
</style>