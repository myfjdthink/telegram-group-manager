import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const yesterdayStart = new Date(todayStart)
    yesterdayStart.setDate(yesterdayStart.getDate() - 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // 今日收益
    const todayEarnings = await prisma.ftUserAssetFlow.aggregate({
      where: {
        createdAt: {
          gte: todayStart,
          lt: now,
        },
        status: "USER_ASSET_FLOW_STATUS_DONE",
      },
      _sum: {
        amount: true,
      },
    })

    // 昨日收益
    const yesterdayEarnings = await prisma.ftUserAssetFlow.aggregate({
      where: {
        createdAt: {
          gte: yesterdayStart,
          lt: todayStart,
        },
        status: "USER_ASSET_FLOW_STATUS_DONE",
      },
      _sum: {
        amount: true,
      },
    })

    // 本月收益
    const monthEarnings = await prisma.ftUserAssetFlow.aggregate({
      where: {
        createdAt: {
          gte: monthStart,
          lt: now,
        },
        status: "USER_ASSET_FLOW_STATUS_DONE",
      },
      _sum: {
        amount: true,
      },
    })

    // 上月收益
    const lastMonthEarnings = await prisma.ftUserAssetFlow.aggregate({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lt: lastMonthEnd,
        },
        status: "USER_ASSET_FLOW_STATUS_DONE",
      },
      _sum: {
        amount: true,
      },
    })

    // 可提现余额（所有已完成的收益总和）
    const totalEarnings = await prisma.ftUserAssetFlow.aggregate({
      where: {
        status: "USER_ASSET_FLOW_STATUS_DONE",
      },
      _sum: {
        amount: true,
      },
    })

    // 计算环比变化
    const todayAmount = todayEarnings._sum.amount || 0
    const yesterdayAmount = yesterdayEarnings._sum.amount || 0
    const monthAmount = monthEarnings._sum.amount || 0
    const lastMonthAmount = lastMonthEarnings._sum.amount || 0

    const todayChange = yesterdayAmount ? ((todayAmount - yesterdayAmount) / yesterdayAmount) * 100 : 0
    const monthChange = lastMonthAmount ? ((monthAmount - lastMonthAmount) / lastMonthAmount) * 100 : 0

    return NextResponse.json({
      today: {
        amount: todayAmount,
        change: todayChange.toFixed(1),
        changeType: todayChange >= 0 ? "positive" : "negative",
      },
      month: {
        amount: monthAmount,
        change: monthChange.toFixed(1),
        changeType: monthChange >= 0 ? "positive" : "negative",
      },
      balance: totalEarnings._sum.amount || 0,
    })
  } catch (error) {
    console.error("获取统计数据失败:", error)
    return NextResponse.json(
      { error: "获取统计数据失败" },
      { status: 500 }
    )
  }
} 