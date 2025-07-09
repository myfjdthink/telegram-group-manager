"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, MessageSquare, DollarSign, Users, Settings, LogOut } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: "dashboard", label: "仪表板", icon: LayoutDashboard },
  { id: "questions", label: "问题管理", icon: MessageSquare },
  { id: "commission", label: "分佣管理", icon: DollarSign },
  { id: "groups", label: "群组管理", icon: Users },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Telegram 群管理</h1>
        <p className="text-sm text-gray-500 mt-1">v1.0</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-3 h-4 w-4" />
          设置
        </Button>
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-3 h-4 w-4" />
          退出登录
        </Button>
      </div>
    </div>
  )
}
