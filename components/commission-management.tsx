"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Commission {
  id: string
  amount: number
  symbol: string
  doneTime: string | null
}

interface PaginationInfo {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

interface Stats {
  today: {
    amount: number
    change: string
    changeType: "positive" | "negative"
  }
  month: {
    amount: number
    change: string
    changeType: "positive" | "negative"
  }
  balance: number
}

export function CommissionManagement() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [timeRange, setTimeRange] = useState("all")
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<Stats>({
    today: { amount: 0, change: "0", changeType: "positive" },
    month: { amount: 0, change: "0", changeType: "positive" },
    balance: 0,
  })
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  })

  const commissionStats = [
    {
      title: "今日收益",
      value: `$${stats.today.amount.toFixed(2)}`,
      change: `${stats.today.change}%`,
      changeType: stats.today.changeType,
      icon: DollarSign,
    },
    {
      title: "本月收益",
      value: `$${stats.month.amount.toFixed(2)}`,
      change: `${stats.month.change}%`,
      changeType: stats.month.changeType,
      icon: TrendingUp,
    },
    {
      title: "可提现余额",
      value: `$${stats.balance.toFixed(2)}`,
      change: "-",
      changeType: "positive",
      icon: Wallet,
    },
  ]

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/commissions/stats")
      if (!response.ok) throw new Error("获取统计数据失败")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("获取统计数据失败:", error)
    }
  }

  const fetchCommissions = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/commissions?timeRange=${timeRange}&page=${page}&pageSize=${pagination.pageSize}`
      )
      if (!response.ok) throw new Error("获取数据失败")
      const data = await response.json()
      setCommissions(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error("获取分佣数据失败:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchCommissions()
  }, [timeRange])

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
  }

  const loadMore = () => {
    if (pagination.page < pagination.totalPages) {
      fetchCommissions(pagination.page + 1)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "USER_ASSET_FLOW_STATUS_DONE":
        return "default"
      case "USER_ASSET_FLOW_STATUS_PENDING":
        return "secondary"
      case "USER_ASSET_FLOW_STATUS_FAILED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "USER_ASSET_FLOW_STATUS_DONE":
        return "已到账"
      case "USER_ASSET_FLOW_STATUS_PENDING":
        return "处理中"
      case "USER_ASSET_FLOW_STATUS_FAILED":
        return "失败"
      default:
        return "未知"
    }
  }

  const getFlowTypeText = (flowType: string) => {
    switch (flowType) {
      case "COMMISSION":
        return "分佣收益"
      case "ACTIVITY_REWARD":
        return "活动收益"
      default:
        return "其他"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">分佣管理</h1>
        </div>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          提现
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-center py-4">加载中...</div>}
          
          <div className="space-y-4">
            {commissions.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{record.doneTime || "处理中"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">
                    +{record.amount} {record.symbol}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          {!loading && pagination.page < pagination.totalPages && (
            <div className="text-center mt-6">
              <Button variant="outline" className="bg-transparent" onClick={loadMore}>
                加载更多记录
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
