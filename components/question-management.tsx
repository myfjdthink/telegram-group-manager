"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Bot, Settings, Languages, Tag, Eye } from "lucide-react"

export function QuestionManagement() {
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)
  const [targetLanguage, setTargetLanguage] = useState("zh")
  const [showSettings, setShowSettings] = useState(false)

  const questions = [
    {
      id: 1,
      user: "@user123",
      avatar: "/placeholder.svg?height=32&width=32",
      originalText: "How to participate in NFT lottery? I am new user, don't understand process.",
      translatedText: "如何参与NFT抽奖活动？我是新用户，不太了解流程。",
      group: "NFT爱好者群",
      priority: "high",
      time: "2分钟前",
      aiSummary: "AI分析：用户询问NFT抽奖参与流程，建议提供详细步骤指导",
      aiSuggestedReply:
        "您好！参与NFT抽奖很简单：1. 首先绑定您的钱包地址 2. 在活动页面点击参与按钮 3. 等待抽奖结果公布。如需帮助，请随时联系管理员。",
      tags: ["活动咨询", "新用户", "NFT"],
      language: "en",
      isViewed: false,
    },
    {
      id: 2,
      user: "@crypto_fan",
      avatar: "/placeholder.svg?height=32&width=32",
      originalText: "分佣什么时候到账？我昨天邀请了3个群，但还没看到收益。",
      translatedText: "分佣什么时候到账？我昨天邀请了3个群，但还没看到收益。",
      group: "加密货币讨论群",
      priority: "medium",
      time: "5分钟前",
      aiSummary: "AI分析：用户询问分佣到账时间，涉及邀请奖励机制",
      aiSuggestedReply:
        "分佣通常在24小时内到账。请确认：1. 邀请的群组已成功绑定 2. 群组成员数达到最低要求 3. 检查您的钱包地址是否正确。如仍有问题，请提供邀请码以便查询。",
      tags: ["分佣问题", "邀请奖励"],
      language: "zh",
      isViewed: false,
    },
    {
      id: 3,
      user: "@newbie001",
      avatar: "/placeholder.svg?height=32&width=32",
      originalText: "¿Cómo vincular la dirección de la billetera? No puedo encontrar la entrada de configuración.",
      translatedText: "怎么绑定钱包地址？找不到设置入口。",
      group: "新手入门群",
      priority: "low",
      time: "10分钟前",
      aiSummary: "AI分析：用户需要钱包绑定帮助，属于基础操作指导",
      aiSuggestedReply:
        "绑定钱包地址的步骤：1. 点击群内Bot菜单 2. 选择'个人设置' 3. 点击'绑定钱包' 4. 输入您的钱包地址并确认。建议使用常用的钱包地址以便接收奖励。",
      tags: ["技术支持", "钱包绑定", "新用户"],
      language: "es",
      isViewed: true,
    },
  ]

  const handleViewQuestion = (question: any) => {
    setSelectedQuestion(question)
    // 标记为已查看
    question.isViewed = true
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case "en":
        return "🇺🇸"
      case "zh":
        return "🇨🇳"
      case "es":
        return "🇪🇸"
      case "ja":
        return "🇯🇵"
      case "ko":
        return "🇰🇷"
      default:
        return "🌐"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">问题管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            🚧 功能正在开发中，目前数据是 mock 的，
            <button className="text-blue-600 hover:text-blue-800 underline ml-1">点击催一催程序员</button>
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowSettings(true)}>
          <Settings className="mr-2 h-4 w-4" />
          翻译设置
        </Button>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="搜索问题内容或标签..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择群组" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部群组</SelectItem>
                <SelectItem value="nft">NFT爱好者群</SelectItem>
                <SelectItem value="crypto">加密货币讨论群</SelectItem>
                <SelectItem value="newbie">新手入门群</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="优先级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部语言</SelectItem>
                <SelectItem value="zh">🇨🇳 中文</SelectItem>
                <SelectItem value="en">🇺🇸 英文</SelectItem>
                <SelectItem value="es">🇪🇸 西班牙文</SelectItem>
                <SelectItem value="ja">🇯🇵 日文</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="unread">未查看</SelectItem>
                <SelectItem value="read">已查看</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 问题列表 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                问题列表 ({questions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedQuestion?.id === question.id
                        ? "border-blue-500 bg-blue-50"
                        : question.isViewed
                          ? "border-gray-200 hover:border-gray-300 bg-gray-50"
                          : "border-orange-200 hover:border-orange-300 bg-orange-50"
                    }`}
                    onClick={() => handleViewQuestion(question)}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={question.avatar || "/placeholder.svg"}
                        alt={question.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-sm">{question.user}</span>
                          <span className="text-sm">{getLanguageFlag(question.language)}</span>
                          <Badge variant={getPriorityColor(question.priority)}>
                            {question.priority === "high" ? "高" : question.priority === "medium" ? "中" : "低"}
                          </Badge>
                          {!question.isViewed && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                              未查看
                            </Badge>
                          )}
                        </div>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {question.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* 翻译后的文本 */}
                        <p className="text-sm text-gray-700 mb-2">{question.translatedText}</p>

                        {/* 原文（如果不是中文） */}
                        {question.language !== "zh" && (
                          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded mb-2">
                            <strong>原文：</strong> {question.originalText}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{question.group}</span>
                          <span>{question.time}</span>
                        </div>

                        {question.aiSummary && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                            <Bot className="inline mr-1 h-3 w-3" />
                            {question.aiSummary}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 问题详情和AI建议 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                {selectedQuestion ? "问题详情" : "选择问题"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedQuestion ? (
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={selectedQuestion.avatar || "/placeholder.svg"}
                        alt={selectedQuestion.user}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium text-sm">{selectedQuestion.user}</span>
                      <span className="text-sm">{getLanguageFlag(selectedQuestion.language)}</span>
                      <Badge variant="outline">{selectedQuestion.group}</Badge>
                    </div>

                    {/* 标签展示 */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {selectedQuestion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* 翻译后的文本 */}
                    <div className="mb-3">
                      <label className="text-xs font-medium text-gray-600">翻译文本：</label>
                      <p className="text-sm text-gray-700 mt-1">{selectedQuestion.translatedText}</p>
                    </div>

                    {/* 原文 */}
                    {selectedQuestion.language !== "zh" && (
                      <div className="border-t pt-2">
                        <label className="text-xs font-medium text-gray-600">
                          原文 ({selectedQuestion.language.toUpperCase()})：
                        </label>
                        <p className="text-sm text-gray-600 mt-1">{selectedQuestion.originalText}</p>
                      </div>
                    )}
                  </div>

                  {/* AI建议回复 */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center">
                      <Bot className="mr-2 h-4 w-4 text-blue-600" />
                      AI 建议回复
                    </label>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Textarea
                        value={selectedQuestion.aiSuggestedReply}
                        readOnly
                        rows={4}
                        className="bg-transparent border-none resize-none text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        复制建议
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        重新生成
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>请选择一个问题查看详情</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 翻译设置弹窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="mr-2 h-5 w-5" />
                翻译设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">目标翻译语言</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">🇨🇳 中文</SelectItem>
                    <SelectItem value="en">🇺🇸 英文</SelectItem>
                    <SelectItem value="es">🇪🇸 西班牙文</SelectItem>
                    <SelectItem value="ja">🇯🇵 日文</SelectItem>
                    <SelectItem value="ko">🇰🇷 韩文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1" onClick={() => setShowSettings(false)}>
                  保存设置
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowSettings(false)}>
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
