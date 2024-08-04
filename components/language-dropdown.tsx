import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { IconAnchor, IconBrandNodejs, IconBrandPython, IconBrandReact } from "@tabler/icons-react"

export function LanguageDropdown() {
  return (
    <Select defaultValue="node">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select preset" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="node">
          <div className="flex items-center gap-2">
            <IconBrandNodejs stroke={1} className="w-4 h-4 text-green-500" />
            Node.js
          </div>
        </SelectItem>
        <SelectItem value="react">
          <div className="flex items-center gap-2">
            <IconBrandReact stroke={1} className="w-4 h-4 text-cyan-500" />
            React
          </div>
        </SelectItem>
        <SelectItem value="anchor">
          <div className="flex items-center gap-2">
            <IconAnchor stroke={1} className="w-4 h-4 text-blue-500" />
            Anchor
          </div>
        </SelectItem>
        <SelectItem value="python">
          <div className="flex items-center gap-2">
            <IconBrandPython stroke={1} className="w-4 h-4 text-emerald-500" />
            Python
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
