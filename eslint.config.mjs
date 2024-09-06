import antfu from '@antfu/eslint-config'

export default antfu({
  globals: {
    unsafeWindow: 'readonly',
  },
})
