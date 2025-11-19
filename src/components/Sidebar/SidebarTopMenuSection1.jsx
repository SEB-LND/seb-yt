import { sideBarMenuRows } from './sidebarData'
import { SidebarRow } from './SidebarRow'

export const SidebarTopMenuSection1 = () => {
  return sideBarMenuRows.slice(0, 5).map(({ Icon, text, path }) => {
    return <SidebarRow key={text} Icon={Icon} text={text} path={path} />
  })
}
