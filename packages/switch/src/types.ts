export interface SwitchProps {
  protocol?: 'http' | 'https'
  prefix?: string
  subdomain: string
  action: string
  env: string
  port: number
}
