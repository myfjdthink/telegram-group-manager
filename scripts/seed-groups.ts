import prisma from "../lib/prisma"

const mockGroups = [
  {
    name: "NFT爱好者群",
    ownerId: "user123",
    ownerUsername: "nft_lover",
    bindTime: new Date("2025-07-01"),
    isBotAdmin: true,
    isCollecting: true,
    activityPushUsdtLottery: true,
    activityPushNftLottery: true,
    activityPushPriceGuess: false,
    memberCount: 156,
  },
  {
    name: "NFT资讯频道",
    ownerId: "user456",
    ownerUsername: "nft_news",
    bindTime: new Date("2025-07-02"),
    isBotAdmin: true,
    isCollecting: true,
    activityPushUsdtLottery: false,
    activityPushNftLottery: true,
    activityPushPriceGuess: true,
    memberCount: 234,
  },
  {
    name: "加密货币讨论群",
    ownerId: "user789",
    ownerUsername: "crypto_chat",
    bindTime: new Date("2025-07-03"),
    isBotAdmin: false,
    isCollecting: false,
    activityPushUsdtLottery: false,
    activityPushNftLottery: false,
    activityPushPriceGuess: false,
    memberCount: 89,
  },
  {
    name: "新手入门群",
    ownerId: "user101",
    ownerUsername: "crypto_newbie",
    bindTime: new Date("2025-07-05"),
    isBotAdmin: true,
    isCollecting: true,
    activityPushUsdtLottery: true,
    activityPushNftLottery: false,
    activityPushPriceGuess: true,
    memberCount: 23,
  },
]

async function main() {
  console.log("开始生成测试数据...")

  // 清空现有数据
  await prisma.group.deleteMany()
  console.log("已清空现有群组数据")

  // 插入新数据
  for (const group of mockGroups) {
    await prisma.group.create({
      data: group,
    })
  }

  console.log(`已成功创建 ${mockGroups.length} 个测试群组`)
}

main()
  .catch((e) => {
    console.error("生成测试数据时出错:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 