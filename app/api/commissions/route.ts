import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "all"
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")

    // 构建时间范围查询条件
    let timeFilter = {}
    const now = new Date()
    switch (timeRange) {
      case "today":
        timeFilter = {
          createdAt: {
            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          },
        }
        break
      case "week":
        const weekStart = new Date(now)
        weekStart.setDate(now.getDate() - now.getDay())
        timeFilter = {
          createdAt: {
            gte: weekStart,
          },
        }
        break
      case "month":
        timeFilter = {
          createdAt: {
            gte: new Date(now.getFullYear(), now.getMonth(), 1),
          },
        }
        break
    }

    // 查询总记录数
    const total = await prisma.ftUserAssetFlow.count({
      where: {
        ...timeFilter,
      },
    })

    // 查询分页数据
    const commissions = await prisma.ftUserAssetFlow.findMany({
      where: {
        ...timeFilter,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return NextResponse.json({
      data: commissions,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error("获取分佣数据失败:", error)
    return NextResponse.json(
      { error: "获取分佣数据失败" },
      { status: 500 }
    )
  }
} 