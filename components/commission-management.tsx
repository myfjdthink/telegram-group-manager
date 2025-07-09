"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  Users,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export function CommissionManagement() {
  const commissionStats = [
    {
      title: "今日收益",
      value: "$1,234.56",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "本月收益",
      value: "$15,678.90",
      change: "+8.3%",
      changeType: "positive",
      icon: TrendingUp,
    },
    {
      title: "下级群组",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "待结算",
      value: "$456.78",
      change: "-5.2%",
      changeType: "negative",
      icon: Wallet,
    },
  ]

  const commissionRecords = [
    {
      id: 1,
      type: "commission",
      group: "NFT爱好者群",
      inviter: "@user123",
      amount: 45.67,
      currency: "USDT",
      status: "completed",
      time: "2025-07-08 14:30",
      txHash: "0x1234...5678",
    },
    {
      id: 2,
      type: "activity",
      group: "加密货币讨论群",
      inviter: "@crypto_fan",
      amount: 23.45,
      currency: "USDT",
      status: "pending",
      time: "2025-07-08 13:15",
      txHash: "",
    },
    {
      id: 3,
      type: "commission",
      group: "新手入门群",
      inviter: "@newbie001",
      amount: 12.34,
      currency: "USDT",
      status: "completed",
      time: "2025-07-08 12:00",
      txHash: "0xabcd...efgh",
    },
  ]

  const subGroups = [
    {
      id: 1,
      name: "NFT爱好者群",
      inviter: "@user123",
      members: 156,
      todayRevenue: 45.67,
      totalRevenue: 234.56,
      commissionRate: 3,
      status: "active",
      joinDate: "2025-07-01",
    },
    {
      id: 2,
      name: "加密货币讨论群",
      inviter: "@crypto_fan",
      members: 89,
      todayRevenue: 23.45,
      totalRevenue: 156.78,
      commissionRate: 3,
      status: "active",
      joinDate: "2025-07-03",
    },
    {
      id: 3,
      name: "新手入门群",
      inviter: "@newbie001",
      members: 23,
      todayRevenue: 12.34,
      totalRevenue: 67.89,
      commissionRate: 3,
      status: "paused",
      joinDate: "2025-07-05",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "active":
        return "default"
      case "paused":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成"
      case "pending":
        return "处理中"
      case "failed":
        return "失败"
      case "active":
        return "活跃"
      case "paused":
        return "暂停"
      default:
        return "未知"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">分佣管理</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出明细
          </Button>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            立即结算
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commissionStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="inline h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="inline h-3 w-3 mr-1" />
                      )}
                      {stat.change} 较昨日
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList>
          <TabsTrigger value="records">分佣记录</TabsTrigger>
          <TabsTrigger value="groups">下级群组</TabsTrigger>
          <TabsTrigger value="analytics">收益分析</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>分佣记录</CardTitle>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="时间范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="week">本周</SelectItem>
                      <SelectItem value="month">本月</SelectItem>
                      <SelectItem value="all">全部</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="pending">处理中</SelectItem>
                      <SelectItem value="failed">失败</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissionRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          record.type === "commission" ? "bg-green-100" : "bg-blue-100"
                        }`}
                      >
                        {record.type === "commission" ? (
                          <DollarSign
                            className={`h-5 w-5 ${record.type === "commission" ? "text-green-600" : "text-blue-600"}`}
                          />
                        ) : (
                          <Calendar className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{record.group}</span>
                          <Badge variant="outline">{record.type === "commission" ? "分佣收益" : "活动收益"}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">邀请人: {record.inviter}</p>
                        <p className="text-xs text-gray-400">{record.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">
                          +{record.amount} {record.currency}
                        </span>
                        <Badge variant={getStatusColor(record.status)}>{getStatusText(record.status)}</Badge>
                      </div>
                      {record.txHash && <p className="text-xs text-gray-400 mt-1">TX: {record.txHash}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>下级群组管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subGroups.map((group) => (
                  <div key={group.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-gray-500">邀请人: {group.inviter}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(group.status)}>{getStatusText(group.status)}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">成员数量</span>
                        <p className="font-medium">{group.members}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">今日收益</span>
                        <p className="font-medium text-green-600">${group.todayRevenue}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">总收益</span>
                        <p className="font-medium">${group.totalRevenue}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">分佣比例</span>
                        <p className="font-medium">{group.commissionRate}%</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <span className="text-xs text-gray-400">加入时间: {group.joinDate}</span>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        查看详情
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>收益分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">收益趋势图表（集成图表库后显示）</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
