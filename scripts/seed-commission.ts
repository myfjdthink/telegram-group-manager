import prisma from "../lib/prisma"
import Mock from 'mockjs'

// 定义佣金数据模板
const commissionTemplate = {
  'userId|1': ['user123', 'user456', 'user789', 'user101', 'user202', 'user303'],
  'assetId': 'usdt',
  'assetName': 'USDT',
  'flowType|1': ['COMMISSION', 'ACTIVITY_REWARD'],
  'symbol': 'USDT',
  'amount|1-1000.1-2': 100,
  'status|1': ['USER_ASSET_FLOW_STATUS_DONE', 'USER_ASSET_FLOW_STATUS_PENDING'],
  'extends': {
    'groupName|1': ['NFT爱好者群', '加密货币讨论群', '新手入门群', 'NFT资讯频道', 'Web3社区', '元宇宙探索群'],
    'inviterUsername': '@string("@", 1)@word(5, 10)',
    'txHash': /0x[0-9a-f]{64}/
  },
  'unique': function() {
    return 'commission_' + Mock.Random.guid()
  }
}

// 生成测试数据
const generateMockCommissions = (count: number) => {
  return Array.from({ length: count }, () => {
    const data = Mock.mock(commissionTemplate)
    
    const randomDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    randomDate.setHours(Math.floor(Math.random() * 24))
    randomDate.setMinutes(Math.floor(Math.random() * 60))
    randomDate.setSeconds(Math.floor(Math.random() * 60))
    data.doneTime = randomDate
    
    return data
  })
}

async function main() {
  console.log("开始生成分佣测试数据...")
  const TOTAL_RECORDS = 100 // 生成100条测试数据

  // 清空现有数据
  await prisma.ftUserAssetFlow.deleteMany()
  console.log("已清空现有分佣数据")

  // 生成并插入新数据
  const mockCommissions = generateMockCommissions(TOTAL_RECORDS)
  
  // 批量插入数据
  await prisma.ftUserAssetFlow.createMany({
    data: mockCommissions,
  })

  console.log(`已成功创建 ${TOTAL_RECORDS} 条测试分佣记录`)
}

main()
  .catch((e) => {
    console.error("生成分佣测试数据时出错:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 