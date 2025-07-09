import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Group } from "@/lib/generated/prisma"

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    // 转换数据格式以匹配前端需求
    const formattedGroups = groups.map((group: Group) => ({
      id: group.id,
      name: group.name,
      type: "group", // 目前只支持群组类型
      members: group.memberCount,
      activeMembers: 0, // 需要另外的表来统计
      createdAt: group.bindTime.toISOString().split("T")[0],
      todayMessages: 0, // 需要另外的表来统计
      todayQuestions: 0, // 需要另外的表来统计
      activities: {
        messageCollection: { enabled: group.isCollecting },
        usdtLottery: { enabled: group.activityPushUsdtLottery },
        nftTreasure: { enabled: group.activityPushNftLottery },
        priceGuess: { enabled: group.activityPushPriceGuess },
      },
    }))

    return NextResponse.json({
      code: 200,
      data: formattedGroups,
    })
  } catch (error) {
    console.error("Failed to fetch groups:", error)
    return NextResponse.json(
      {
        code: 500,
        message: "获取群组列表失败",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, activities } = body

    if (!id || !activities) {
      return NextResponse.json(
        {
          code: 400,
          message: "缺少必要参数",
        },
        { status: 400 }
      )
    }

    const updatedGroup = await prisma.group.update({
      where: { id },
      data: {
        isCollecting: activities.messageCollection?.enabled,
        activityPushUsdtLottery: activities.usdtLottery?.enabled,
        activityPushNftLottery: activities.nftTreasure?.enabled,
        activityPushPriceGuess: activities.priceGuess?.enabled,
      },
    })

    return NextResponse.json({
      code: 200,
      data: updatedGroup,
    })
  } catch (error) {
    console.error("Failed to update group:", error)
    return NextResponse.json(
      {
        code: 500,
        message: "更新群组设置失败",
      },
      { status: 500 }
    )
  }
} 