<template>
    <span class="label success" v-if="transaction.status===1">{{$t('status.success')}}</span>
    <span class="label danger" v-if="transaction.status===2">{{$t('status.failed')}}</span>
    <span class="label warn" v-if="transaction.status===3">{{$t('status.ongoing')}}</span>
    <span class="label" v-if="transaction.status===4">{{$t('status.canceled')}}</span>
    <span class="label danger" v-if="transaction.status===5">{{$t('status.declined')}}</span>
</template>
<script>
    export default {
        props: ['transaction']
    }
</script>