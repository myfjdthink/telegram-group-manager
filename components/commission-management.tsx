"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Users, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

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
      title: "可提现余额",
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
      status: "completed",
      time: "2025-07-08 13:15",
      txHash: "0xabcd...efgh",
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
      txHash: "0xijkl...mnop",
    },
    {
      id: 4,
      type: "activity",
      group: "NFT爱好者群",
      inviter: "@user456",
      amount: 67.89,
      currency: "USDT",
      status: "completed",
      time: "2025-07-08 11:45",
      txHash: "0xqrst...uvwx",
    },
    {
      id: 5,
      type: "commission",
      group: "加密货币讨论群",
      inviter: "@crypto_fan",
      amount: 34.56,
      currency: "USDT",
      status: "completed",
      time: "2025-07-08 10:30",
      txHash: "0xyzab...cdef",
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
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已到账"
      case "pending":
        return "处理中"
      case "failed":
        return "失败"
      default:
        return "未知"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">分佣管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            🚧 功能正在开发中，目前数据是 mock 的，
            <button className="text-blue-600 hover:text-blue-800 underline ml-1">点击催一催程序员</button>
          </p>
        </div>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          提现
        </Button>
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

      {/* 分佣记录 */}
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
                  <SelectValue placeholder="类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="commission">分佣收益</SelectItem>
                  <SelectItem value="activity">活动收益</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissionRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      record.type === "commission" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    <DollarSign
                      className={`h-5 w-5 ${record.type === "commission" ? "text-green-600" : "text-blue-600"}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{record.group}</span>
                      <Badge variant="outline">{record.type === "commission" ? "分佣收益" : "活动收益"}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">来源: {record.inviter}</p>
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
                  <p className="text-xs text-gray-400 mt-1">TX: {record.txHash}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="text-center mt-6">
            <Button variant="outline" className="bg-transparent">
              加载更多记录
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
