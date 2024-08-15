import Icons from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  }
}