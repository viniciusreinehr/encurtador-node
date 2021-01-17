module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@model': './src/model',
          '@controller': './src/controller'
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }