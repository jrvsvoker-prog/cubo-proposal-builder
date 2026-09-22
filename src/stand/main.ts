import { createApp } from 'vue'
import StandApp from './index'
import '../../vendor/cubo/styles/fonts.css'
import '@cuboapp/styles'
import '@cuboapp/ui-vue/css'
import '../index.scss'
import './index.scss'
import { registerAllIcons } from '@cuboapp/ui-vue/icons'

registerAllIcons()
createApp(StandApp).mount('#app')
