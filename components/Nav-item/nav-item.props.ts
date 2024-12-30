export interface NavItemProps {
  title: string
  url: string
  iconName?: string
  isActive?: boolean
  items?: { title: string; url: string }[]
}