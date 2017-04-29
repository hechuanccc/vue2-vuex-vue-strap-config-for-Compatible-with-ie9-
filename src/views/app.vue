<template>
    <div class="container">
        <div class="test" @click="test">test click!</div>
        <div>{{name}}</div>
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
        }
    }
}
</script>

<style>
    html {
        font-size: 62.5%;
        font-family: Hiragino Sans GB,Helvetica,Arial,STHeiti,WenQuanYi Micro Hei,sans-serif;
    }
    * {
        padding: 0;
        margin: 0;
    }
    body {
        background-color: #F5F5F5;
    }
    .container {
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 7rem;
    }
    .cov-nav {
        position: fixed;
        height: 6rem;
        width: 100%;
        background-color: #252e39;
        top: 0;
        left: 0;
        z-index: 2;
        font-size: 1.5rem;
        color: #fff;
    }
    .nav-tab {
        display: inline-block;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        min-width: 8rem;
        cursor: pointer;
    }
    .nav-rail {
        position: absolute;
        height: 4px;
        width: 100%;
        bottom: 1rem;
        background-color: #182128;
    }
    .nav-moving {
        position: absolute;
        background-color: #4CFFFE;
        height: 8px;
        width: 1rem;
        border-radius: 4px;
        transition-property: transform, width;
        transition-duration: .3s;
        transition-timing-function: ease-out;
        margin-top: -1px;
    }
</style>
