"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  Settings,
  BarChart3,
  Bot,
  Link,
  Copy,
  Eye,
  MessageSquare,
  Gift,
  Coins,
  ImageIcon,
  Trophy,
  Star,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

interface Group {
  id: string
  name: string
  type: string
  members: number
  activeMembers: number
  createdAt: string
  todayMessages: number
  todayQuestions: number
  activities: {
    messageCollection: { enabled: boolean }
    usdtLottery: { enabled: boolean }
    nftTreasure: { enabled: boolean }
    priceGuess: { enabled: boolean }
  }
}

export function GroupManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  const activityTypes = [
    {
      key: "messageCollection",
      name: "群对话收集",
      description: "收集群组对话内容",
      icon: MessageSquare,
    },
    {
      key: "usdtLottery",
      name: "USDT抽奖",
      description: "USDT抽奖活动",
      icon: Coins,
    },
    {
      key: "nftTreasure",
      name: "NFT夺宝",
      description: "NFT夺宝活动",
      icon: ImageIcon,
    },
    {
      key: "priceGuess",
      name: "币价竞猜",
      description: "币价竞猜活动",
      icon: Trophy,
    },
  ]

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/groups")
      const result = await response.json()
      if (result.code === 200) {
        setGroups(result.data)
      } else {
        toast.error("获取群组列表失败")
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error)
      toast.error("获取群组列表失败")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!selectedGroup) return

    try {
      const response = await fetch(`/api/groups`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedGroup.id,
          activities: selectedGroup.activities,
        }),
      })

      const result = await response.json()
      if (result.code === 200) {
        toast.success("设置已保存")
        setSelectedGroup(null)
        fetchGroups() // 重新获取群组列表
      } else {
        toast.error("保存设置失败")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast.error("保存设置失败")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "paused":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "正常"
      case "paused":
        return "暂停"
      case "error":
        return "异常"
      default:
        return "未知"
    }
  }

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const getActiveActivitiesCount = (activities: any) => {
    return Object.values(activities).filter((activity: any) => activity.enabled).length
  }

  const handleActivityToggle = (activityKey: string, enabled: boolean) => {
    if (!selectedGroup) return

    setSelectedGroup({
      ...selectedGroup,
      activities: {
        ...selectedGroup.activities,
        [activityKey]: { enabled },
      },
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">群组管理</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bot className="mr-2 h-4 w-4" />
            Task3 Bot 设置
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加群组
          </Button>
        </div>
      </div>

      {/* 群组概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总群组数</p>
                <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总成员数</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.reduce((sum, group) => sum + group.members, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃成员</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.reduce((sum, group) => sum + group.activeMembers, 0)}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃活动</p>
                <p className="text-2xl font-bold text-gray-900">
                  {groups.reduce((sum, group) => sum + getActiveActivitiesCount(group.activities), 0)}
                </p>
              </div>
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 群组列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          // 加载状态
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow animate-pulse">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200" />
                    <div>
                      <div className="h-6 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                      <div className="h-6 w-12 bg-gray-200 rounded mt-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          groups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        group.type === "group" ? "bg-blue-100" : "bg-purple-100"
                      }`}
                    >
                      {group.type === "group" ? (
                        <Users
                          className={`h-5 w-5 ${group.type === "group" ? "text-blue-600" : "text-purple-600"}`}
                        />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {group.type === "group" ? "群组" : "频道"} • 创建于 {group.createdAt}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">总成员</span>
                    <p className="font-medium">{group.members}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">活跃成员</span>
                    <p className="font-medium text-green-600">{group.activeMembers}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">今日消息</span>
                    <p className="font-medium">{group.todayMessages}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">待处理问题</span>
                    <p className="font-medium text-orange-600">{group.todayQuestions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 群组设置弹窗 */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                {selectedGroup.name} - 群组设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activityTypes.map((activityType) => {
                const activity = selectedGroup.activities[activityType.key as keyof typeof selectedGroup.activities]
                const Icon = activityType.icon
                return (
                  <div key={activityType.key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{activityType.name}</h4>
                          <p className="text-sm text-gray-500">{activityType.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={activity.enabled}
                        onCheckedChange={(checked) => handleActivityToggle(activityType.key, checked)}
                      />
                    </div>
                  </div>
                )
              })}

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1" onClick={handleSaveSettings}>
                  保存设置
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedGroup(null)}>
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 添加群组表单 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>添加群组/频道</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">类型</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="type" value="group" defaultChecked />
                    <span>群组</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="type" value="channel" />
                    <span>频道</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">群组/频道链接</label>
                <Input placeholder="输入 Telegram 群组或频道链接" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">自定义名称（可选）</label>
                <Input placeholder="输入自定义显示名称" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-bot" defaultChecked />
                <label htmlFor="enable-bot" className="text-sm">
                  启用 Bot 功能
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-activities" />
                <label htmlFor="auto-activities" className="text-sm">
                  启用默认活动
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">
                  <Link className="mr-2 h-4 w-4" />
                  连接群组
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
