import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // 获取当前群组总数
    const total = await prisma.group.count()

    // 获取昨天的群组数（通过创建时间判断）
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)
    const totalYesterday = await prisma.group.count({
      where: {
        createdAt: {
          lt: yesterday,
        },
      },
    })

    // 计算变化
    const change = total - totalYesterday
    const changeType = change >= 0 ? "positive" : "negative"

    // 获取活跃活动数量
    const activeActivities = await prisma.group.count({
      where: {
        OR: [
          { activityPushUsdtLottery: true },
          { activityPushNftLottery: true },
          { activityPushPriceGuess: true },
        ],
      },
    })

    // 模拟昨天的活动数（实际应该从活动历史记录中获取）
    const activeActivitiesYesterday = activeActivities - 2 // 假设比今天少2个
    const activitiesChange = activeActivities - activeActivitiesYesterday
    const activitiesChangeType = activitiesChange >= 0 ? "positive" : "negative"

    // 模拟待处理问题数据（实际应该从问题表中获取）
    const pendingQuestions = 23
    const questionsChange = -5
    const questionsChangeType = questionsChange >= 0 ? "positive" : "negative"

    return NextResponse.json({
      total,
      change,
      changeType,
      activeActivities,
      activitiesChange,
      activitiesChangeType,
      pendingQuestions,
      questionsChange,
      questionsChangeType,
    })
  } catch (error) {
    console.error("获取群组统计数据失败:", error)
    return NextResponse.json(
      { error: "获取群组统计数据失败" },
      { status: 500 }
    )
  }
} 