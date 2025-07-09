"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Calendar, DollarSign, Activity } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "总群组数",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "待处理问题",
      value: "23",
      change: "-5",
      changeType: "positive",
      icon: MessageSquare,
    },
    {
      title: "活跃活动",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "今日分佣收益",
      value: "$1,234",
      change: "+12%",
      changeType: "positive",
      icon: DollarSign,
    },
  ]

  const recentQuestions = [
    {
      id: 1,
      user: "@user123",
      question: "如何参与NFT抽奖活动？",
      group: "NFT爱好者群",
      priority: "high",
      time: "2分钟前",
    },
    {
      id: 2,
      user: "@crypto_fan",
      question: "分佣什么时候到账？",
      group: "加密货币讨论群",
      priority: "medium",
      time: "5分钟前",
    },
    {
      id: 3,
      user: "@newbie001",
      question: "怎么绑定钱包地址？",
      group: "新手入门群",
      priority: "low",
      time: "10分钟前",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      name: "USDT大奖抽奖",
      group: "NFT爱好者群",
      participants: 156,
      status: "active",
      endTime: "2小时后",
    },
    {
      id: 2,
      name: "NFT盲盒夺宝",
      group: "加密货币讨论群",
      participants: 89,
      status: "active",
      endTime: "1天后",
    },
    {
      id: 3,
      name: "新人欢迎奖励",
      group: "新手入门群",
      participants: 23,
      status: "completed",
      endTime: "已结束",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} 较昨日
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近问题 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              最近问题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuestions.map((question) => (
                <div key={question.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{question.user}</span>
                      <Badge
                        variant={
                          question.priority === "high"
                            ? "destructive"
                            : question.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {question.priority === "high" ? "高" : question.priority === "medium" ? "中" : "低"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{question.question}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{question.group}</span>
                      <span>{question.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              查看全部问题
            </Button>
          </CardContent>
        </Card>

        {/* 活动状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              活动状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{activity.name}</span>
                      <Badge variant={activity.status === "active" ? "default" : "secondary"}>
                        {activity.status === "active" ? "进行中" : "已结束"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{activity.group}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{activity.participants} 人参与</span>
                      <span>{activity.endTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              管理所有活动
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
