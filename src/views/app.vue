<template>
    <div class="container">
        <div class="test" @click="test">test click!</div>
        <div>{{name}}</div>
        <div @click="checkGet">test api!</div>
        <a href="ww">222</a>
        <div class="fa fa-reply"></div>
        <div class="t-grey text-success">ww</div>
        <div class="f-circle frotate-05"></div>
        <div class="fa fa-phone light-green"></div>
    </div>
</template>

<script>
import store from '../vuex/index/store'
import { mapState } from 'vuex'

export default {
    store: store,
    data () {
        return {
            Progress: {
                percent: 0,
                options: {
                    show: true,
                    canSuccess: true,
                    color: 'rgb(1, 223, 255)',
                    failedColor: 'red',
                    height: '2px'
                }
            },
            covNav: {
                navMap: {},
                currentX: 0,
                moving: {
                    width: '8px',
                    transform: 'translateX(0px)'
                }
            }
        }
    },
    computed: {
        ...mapState(['name'])
    },
    methods: {
        test () {
            this.$store.dispatch('test', 'hechuan').then((data) => {
                console.log(data)
            })
        },
        checkGet () {
            this.$http.get('/api/checkname').then(response => {
                console.log(response.data)
            })
        }
    },
    components: {
        pageStyle: require('../components/style.vue')
    }
}
</script>

<style lang="scss">
    .frotate-05 {
        right: 0;
        top: 35px;
        animation-delay: 0.65s;
    }
</style>
