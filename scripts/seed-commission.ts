import prisma from "../lib/prisma"

const mockCommissions = [
  {
    userId: "user123",
    assetId: "usdt",
    assetName: "USDT",
    flowType: "COMMISSION",
    symbol: "USDT",
    amount: 45.67,
    status: "USER_ASSET_FLOW_STATUS_DONE",
    doneTime: new Date("2025-07-08T14:30:00Z"),
    extends: {
      groupName: "NFT爱好者群",
      inviterUsername: "@user123",
      txHash: "0x1234...5678"
    },
    unique: "commission_1"
  },
  {
    userId: "user456",
    assetId: "usdt",
    assetName: "USDT",
    flowType: "ACTIVITY_REWARD",
    symbol: "USDT",
    amount: 23.45,
    status: "USER_ASSET_FLOW_STATUS_DONE",
    doneTime: new Date("2025-07-08T13:15:00Z"),
    extends: {
      groupName: "加密货币讨论群",
      inviterUsername: "@crypto_fan",
      txHash: "0xabcd...efgh"
    },
    unique: "commission_2"
  },
  {
    userId: "user789",
    assetId: "usdt",
    assetName: "USDT",
    flowType: "COMMISSION",
    symbol: "USDT",
    amount: 12.34,
    status: "USER_ASSET_FLOW_STATUS_PENDING",
    extends: {
      groupName: "新手入门群",
      inviterUsername: "@newbie001",
      txHash: "0xijkl...mnop"
    },
    unique: "commission_3"
  },
  {
    userId: "user101",
    assetId: "usdt",
    assetName: "USDT",
    flowType: "COMMISSION",
    symbol: "USDT",
    amount: 67.89,
    status: "USER_ASSET_FLOW_STATUS_DONE",
    doneTime: new Date("2025-07-08T11:45:00Z"),
    extends: {
      groupName: "NFT资讯频道",
      inviterUsername: "@nft_news",
      txHash: "0xqrst...uvwx"
    },
    unique: "commission_4"
  },
  {
    userId: "user123",
    assetId: "usdt",
    assetName: "USDT",
    flowType: "ACTIVITY_REWARD",
    symbol: "USDT",
    amount: 34.56,
    status: "USER_ASSET_FLOW_STATUS_DONE",
    doneTime: new Date("2025-07-08T10:30:00Z"),
    extends: {
      groupName: "NFT爱好者群",
      inviterUsername: "@user123",
      txHash: "0xyzab...cdef"
    },
    unique: "commission_5"
  },
]

async function main() {
  console.log("开始生成分佣测试数据...")

  // 清空现有数据
  await prisma.ftUserAssetFlow.deleteMany()
  console.log("已清空现有分佣数据")

  // 插入新数据
  for (const commission of mockCommissions) {
    await prisma.ftUserAssetFlow.create({
      data: commission,
    })
  }

  console.log(`已成功创建 ${mockCommissions.length} 条测试分佣记录`)
}

main()
  .catch((e) => {
    console.error("生成分佣测试数据时出错:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 