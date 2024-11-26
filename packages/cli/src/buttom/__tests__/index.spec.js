import Buttom from '..'
import VarButtom from '../Buttom'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('test buttom plugin', () => {
  const app = createApp({}).use(Buttom)
  expect(app.component(Buttom.name)).toBeTruthy()
})
