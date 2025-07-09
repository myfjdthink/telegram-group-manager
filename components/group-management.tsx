"use client"

import { useState } from "react"
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

export function GroupManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)

  const groups = [
    {
      id: 1,
      name: "NFT爱好者群",
      type: "group",
      members: 156,
      activeMembers: 89,
      botEnabled: true,
      inviteCode: "NFT2025ABC",
      createdAt: "2025-07-01",
      todayMessages: 45,
      todayQuestions: 8,
      status: "active",
      activities: {
        dailyLottery: { enabled: true, prize: "50 USDT", participants: 23 },
        nftTreasure: { enabled: true, prize: "稀有NFT", participants: 15 },
        welcomeReward: { enabled: true, prize: "10 USDT", participants: 8 },
        checkIn: { enabled: false, prize: "积分奖励", participants: 0 },
        referralBonus: { enabled: true, prize: "3% 分佣", participants: 5 },
      },
    },
    {
      id: 2,
      name: "NFT资讯频道",
      type: "channel",
      members: 234,
      activeMembers: 156,
      botEnabled: true,
      inviteCode: "NFTCHAN2025",
      createdAt: "2025-07-02",
      todayMessages: 12,
      todayQuestions: 0,
      status: "active",
      activities: {
        dailyLottery: { enabled: false, prize: "50 USDT", participants: 0 },
        nftTreasure: { enabled: true, prize: "限量NFT", participants: 45 },
        welcomeReward: { enabled: true, prize: "5 USDT", participants: 12 },
        checkIn: { enabled: true, prize: "积分奖励", participants: 67 },
        referralBonus: { enabled: false, prize: "3% 分佣", participants: 0 },
      },
    },
    {
      id: 3,
      name: "加密货币讨论群",
      type: "group",
      members: 89,
      activeMembers: 67,
      botEnabled: false,
      inviteCode: "CRYPTO2025XYZ",
      createdAt: "2025-07-03",
      todayMessages: 23,
      todayQuestions: 5,
      status: "active",
      activities: {
        dailyLottery: { enabled: false, prize: "50 USDT", participants: 0 },
        nftTreasure: { enabled: false, prize: "稀有NFT", participants: 0 },
        welcomeReward: { enabled: false, prize: "10 USDT", participants: 0 },
        checkIn: { enabled: false, prize: "积分奖励", participants: 0 },
        referralBonus: { enabled: false, prize: "3% 分佣", participants: 0 },
      },
    },
    {
      id: 4,
      name: "新手入门群",
      type: "group",
      members: 23,
      activeMembers: 18,
      botEnabled: true,
      inviteCode: "NEWBIE2025DEF",
      createdAt: "2025-07-05",
      todayMessages: 67,
      todayQuestions: 12,
      status: "paused",
      activities: {
        dailyLottery: { enabled: true, prize: "20 USDT", participants: 8 },
        nftTreasure: { enabled: false, prize: "入门NFT", participants: 0 },
        welcomeReward: { enabled: true, prize: "15 USDT", participants: 23 },
        checkIn: { enabled: true, prize: "新手积分", participants: 18 },
        referralBonus: { enabled: true, prize: "5% 分佣", participants: 3 },
      },
    },
  ]

  const activityTypes = [
    {
      key: "dailyLottery",
      name: "每日抽奖",
      description: "每天定时进行USDT抽奖",
      icon: Coins,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      key: "nftTreasure",
      name: "NFT夺宝",
      description: "限时NFT盲盒活动",
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      key: "welcomeReward",
      name: "新人奖励",
      description: "新用户入群欢迎奖励",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      key: "checkIn",
      name: "签到奖励",
      description: "每日签到获得积分",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      key: "referralBonus",
      name: "邀请分佣",
      description: "邀请新群获得分佣",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

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
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">群组概览</TabsTrigger>
          <TabsTrigger value="activities">活动配置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* 群组列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groups.map((group) => (
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
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(group.status)}>{getStatusText(group.status)}</Badge>
                      <div className="flex items-center space-x-1">
                        <Bot className={`h-4 w-4 ${group.botEnabled ? "text-green-600" : "text-gray-400"}`} />
                        <Switch checked={group.botEnabled} />
                      </div>
                    </div>
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

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-500">邀请码</span>
                      <p className="font-mono text-sm font-medium">{group.inviteCode}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyInviteCode(group.inviteCode)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* 活动状态概览 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">活动状态</span>
                      <span className="text-xs text-gray-500">
                        {getActiveActivitiesCount(group.activities)}/{Object.keys(group.activities).length} 已启用
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {activityTypes.map((activityType) => {
                        const activity = group.activities[activityType.key]
                        const Icon = activityType.icon
                        return (
                          <div
                            key={activityType.key}
                            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                              activity.enabled
                                ? `${activityType.bgColor} ${activityType.color}`
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <Icon className="h-3 w-3" />
                            <span>{activityType.name}</span>
                            {activity.enabled && activity.participants > 0 && (
                              <span className="bg-white bg-opacity-70 px-1 rounded">{activity.participants}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="mr-1 h-3 w-3" />
                      详情
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedGroup(group)}
                    >
                      <Settings className="mr-1 h-3 w-3" />
                      活动设置
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

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>活动类型配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activityTypes.map((activityType) => {
                  const Icon = activityType.icon
                  return (
                    <Card key={activityType.key} className="border-2 border-dashed border-gray-200">
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-12 h-12 ${activityType.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}
                        >
                          <Icon className={`h-6 w-6 ${activityType.color}`} />
                        </div>
                        <h3 className="font-medium mb-1">{activityType.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{activityType.description}</p>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          配置模板
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 群组活动设置弹窗 */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                {selectedGroup.name} - 活动设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activityTypes.map((activityType) => {
                const activity = selectedGroup.activities[activityType.key]
                const Icon = activityType.icon
                return (
                  <div key={activityType.key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${activityType.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 ${activityType.color}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{activityType.name}</h4>
                          <p className="text-sm text-gray-500">{activityType.description}</p>
                        </div>
                      </div>
                      <Switch checked={activity.enabled} />
                    </div>

                    {activity.enabled && (
                      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t">
                        <div>
                          <label className="text-sm font-medium">奖品设置</label>
                          <Input value={activity.prize} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">当前参与人数</label>
                          <Input value={activity.participants} readOnly className="mt-1 bg-gray-50" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">保存设置</Button>
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
