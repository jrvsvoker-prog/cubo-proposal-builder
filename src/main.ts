import { createApp } from 'vue'
import App from './app/index'
import '../vendor/cubo/styles/fonts.css'
import '@cuboapp/styles'
import '@cuboapp/ui-vue/css'
import './index.scss'
import { cuboSetConfig } from '@cuboapp/ui-vue'
import { registerAllIcons } from '@cuboapp/ui-vue/icons'

// Встроенные строки кита («Выбрать все», плейсхолдеры поиска, пустые состояния).
cuboSetConfig({ language: 'ru' })
registerAllIcons()
createApp(App).mount('#app')
