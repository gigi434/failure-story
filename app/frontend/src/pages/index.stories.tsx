import { ComponentMeta } from '@storybook/react'
import Home from 'pages'

export default {
  title: 'Pages/index',
  component: Home,
} as ComponentMeta<typeof Home>

export const HomePage = () => <Home />
