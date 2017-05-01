<template>
    <div class="description-editor">
        <div class="tiny-mce-toolbar">
            <div id="{{id}}-toolbar"></div>
        </div>
        <div class="tiny-mce" id="{{id}}"></div>
    </div>
</template>
<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import 'tinymce/skins/lightgray/skin.min.css'
    // Plugins
    import 'tinymce/plugins/advlist/plugin'
    import 'tinymce/plugins/autolink/plugin'
    import 'tinymce/plugins/lists/plugin'
    import 'tinymce/plugins/link/plugin'
    import 'tinymce/plugins/image/plugin'
    import 'tinymce/plugins/charmap/plugin'
    import 'tinymce/plugins/print/plugin'
    import 'tinymce/plugins/preview/plugin'
    import 'tinymce/plugins/hr/plugin'
    import 'tinymce/plugins/searchreplace/plugin'
    import 'tinymce/plugins/wordcount/plugin'
    import 'tinymce/plugins/visualblocks/plugin'
    import 'tinymce/plugins/visualchars/plugin'
    import 'tinymce/plugins/code/plugin'
    import 'tinymce/plugins/fullscreen/plugin'
    import 'tinymce/plugins/insertdatetime/plugin'
    import 'tinymce/plugins/media/plugin'
    import 'tinymce/plugins/nonbreaking/plugin'
    import 'tinymce/plugins/save/plugin'
    import 'tinymce/plugins/table/plugin'
    import 'tinymce/plugins/contextmenu/plugin'
    import 'tinymce/plugins/directionality/plugin'
    import 'tinymce/plugins/emoticons/plugin'
    import 'tinymce/plugins/template/plugin'
    import 'tinymce/plugins/paste/plugin'
    import 'tinymce/plugins/textcolor/plugin'
    import 'tinymce/plugins/colorpicker/plugin'
    import 'tinymce/plugins/textpattern/plugin'
    import 'tinymce/plugins/imagetools/plugin'

    export default {
        props: ['id', 'model', 'content'],
        data () {
            return {
                opt: ''
            }
        },
        watch: {
            model: function (value) {
                if (this._currentState === value) {
                    return
                }
                this.TinyMCE_editor.setContent(value || '')
            }
        },
        ready () {
            var vm = this
            this.opt = {
                setup: function (editor) {
                    vm.TinyMCE_editor = editor
                    vm.TinyMCE_isFirstChange = true
                    editor.on('init', function () {
                        if (this.content) {
                            vm.TinyMCE_editor.setContent(this.content)
                        } else {
                            vm.TinyMCE_editor.setContent(vm.model || '')
                        }
                    })
                    editor.on('SetContent', function () {
                        if (vm.TinyMCE_isFirstChange) {
                            vm.TinyMCE_isFirstChange = false
                            return
                        }
                        vm.model = vm._currentState = editor.getContent()
                    })
                    editor.on('blur', function () {
                        vm.model = vm._currentState = editor.getContent({format: 'html'})
                    })
                },
                mode: 'exact',
                inline: false,
                toolbar_items_size: 'small',
                menubar: true,
                elements: this.id,
                fixed_toolbar_container: '#' + this.id + '-toolbar',
                height: 300,
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor | fontsizeselect',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools'
                ],
                fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
                skin: false
            }
            tinymce.init(this.opt)
            this.$nextTick(function () {
                tinymce.init(this.opt)
            })
        }
    }
</script>