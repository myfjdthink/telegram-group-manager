"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Calendar, Gift, Settings, Play, Pause, BarChart3, Coins, ImageIcon } from "lucide-react"

export function ActivityManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const activities = [
    {
      id: 1,
      name: "USDT大奖抽奖",
      type: "lottery",
      group: "NFT爱好者群",
      prize: "500 USDT",
      participants: 156,
      maxParticipants: 200,
      status: "active",
      startTime: "2025-07-08 10:00",
      endTime: "2025-07-08 18:00",
      description: "参与条件：群内活跃用户，发言超过10条",
    },
    {
      id: 2,
      name: "NFT盲盒夺宝",
      type: "nft",
      group: "加密货币讨论群",
      prize: "稀有NFT x3",
      participants: 89,
      maxParticipants: 100,
      status: "active",
      startTime: "2025-07-07 20:00",
      endTime: "2025-07-09 20:00",
      description: "限时NFT盲盒活动，先到先得",
    },
    {
      id: 3,
      name: "新人欢迎奖励",
      type: "welcome",
      group: "新手入门群",
      prize: "10 USDT",
      participants: 23,
      maxParticipants: 50,
      status: "completed",
      startTime: "2025-07-06 00:00",
      endTime: "2025-07-07 23:59",
      description: "新用户入群即可获得欢迎奖励",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "paused":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "进行中"
      case "completed":
        return "已结束"
      case "paused":
        return "已暂停"
      default:
        return "未知"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lottery":
        return <Coins className="h-4 w-4" />
      case "nft":
        return <ImageIcon className="h-4 w-4" />
      case "welcome":
        return <Gift className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">活动管理</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          创建活动
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">全部活动</TabsTrigger>
          <TabsTrigger value="active">进行中</TabsTrigger>
          <TabsTrigger value="completed">已结束</TabsTrigger>
          <TabsTrigger value="scheduled">已安排</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      {getTypeIcon(activity.type)}
                      <span className="ml-2">{activity.name}</span>
                    </CardTitle>
                    <Badge variant={getStatusColor(activity.status)}>{getStatusText(activity.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">群组:</span>
                      <span>{activity.group}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">奖品:</span>
                      <span className="font-medium text-green-600">{activity.prize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">参与人数:</span>
                      <span>
                        {activity.participants}/{activity.maxParticipants}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                    ></div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>开始: {activity.startTime}</div>
                    <div>结束: {activity.endTime}</div>
                  </div>

                  <p className="text-sm text-gray-600">{activity.description}</p>

                  <div className="flex space-x-2">
                    {activity.status === "active" ? (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Pause className="mr-1 h-3 w-3" />
                        暂停
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Play className="mr-1 h-3 w-3" />
                        启动
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Settings className="mr-1 h-3 w-3" />
                      设置
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <BarChart3 className="mr-1 h-3 w-3" />
                      统计
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8 text-gray-500">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>显示进行中的活动</p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8 text-gray-500">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>显示已结束的活动</p>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="text-center py-8 text-gray-500">
            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>显示已安排的活动</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* 创建活动表单 */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>创建新活动</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">活动名称</label>
                  <Input placeholder="输入活动名称" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">活动类型</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择活动类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lottery">USDT抽奖</SelectItem>
                      <SelectItem value="nft">NFT夺宝</SelectItem>
                      <SelectItem value="welcome">欢迎奖励</SelectItem>
                      <SelectItem value="task">任务奖励</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">目标群组</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择群组" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nft">NFT爱好者群</SelectItem>
                    <SelectItem value="crypto">加密货币讨论群</SelectItem>
                    <SelectItem value="newbie">新手入门群</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">奖品类型</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择奖品类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="ads3">Ads3积分</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">奖品数量/金额</label>
                  <Input placeholder="输入数量或金额" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">开始时间</label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">结束时间</label>
                  <Input type="datetime-local" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">最大参与人数</label>
                <Input type="number" placeholder="输入最大参与人数" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">参与条件</label>
                <Textarea placeholder="描述参与条件..." rows={3} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">活动描述</label>
                <Textarea placeholder="输入活动描述..." rows={3} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-start" />
                <label htmlFor="auto-start" className="text-sm">
                  自动开始活动
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">创建活动</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCreateForm(false)}>
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
