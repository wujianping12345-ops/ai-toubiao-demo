// 招标信息模拟数据
export interface BidInfo {
  id: string;
  title: string;
  publishDate: string;
  deadline: string;
  budget: string;
  region: string;
  category: string;
  source: string;
  status: 'new' | 'tracking' | 'applied' | 'ended';
  matchScore: number;
  /** 商机竞争指数 0-100，越低越蓝海 */
  competitionIndex: number;
  /** 是否中小企业预留/政采预留 */
  smeReserved?: boolean;
  description: string;
  requirements: string[];
  contactPerson: string;
  contactPhone: string;
}

export const bidInfoList: BidInfo[] = [
  {
    id: 'BID-2026-001',
    title: '杭州市萧山区智慧城市管理平台建设项目',
    publishDate: '2026-01-20',
    deadline: '2026-02-15',
    budget: '1,280万元',
    region: '浙江省杭州市',
    category: '信息化建设',
    source: '浙江省政府采购网',
    status: 'new',
    matchScore: 95,
    competitionIndex: 42,
    smeReserved: true,
    description: '本项目旨在建设萧山区智慧城市综合管理平台，整合城市管理、公共服务、应急指挥等功能模块，实现城市运行状态的实时监测和智能分析。',
    requirements: ['具有系统集成一级资质', '近三年有类似项目经验', '项目经理需具备高级项目管理师证书'],
    contactPerson: '张工',
    contactPhone: '0571-8888****',
  },
  {
    id: 'BID-2026-002',
    title: '上海市浦东新区政务服务中心装修改造工程',
    publishDate: '2026-01-18',
    deadline: '2026-02-10',
    budget: '860万元',
    region: '上海市浦东新区',
    category: '装修装饰',
    source: '上海市公共资源交易平台',
    status: 'tracking',
    matchScore: 88,
    competitionIndex: 68,
    description: '对浦东新区政务服务中心进行整体装修改造，包括办公区域、服务大厅、会议室等区域的装修设计与施工。',
    requirements: ['建筑装修装饰工程专业承包一级', '具有绿色建筑设计经验', '需提供完整的装修设计方案'],
    contactPerson: '李主任',
    contactPhone: '021-5888****',
  },
  {
    id: 'BID-2026-003',
    title: '广州市天河区教育局信息化设备采购项目',
    publishDate: '2026-01-15',
    deadline: '2026-02-05',
    budget: '520万元',
    region: '广东省广州市',
    category: '设备采购',
    source: '广东省政府采购网',
    status: 'applied',
    matchScore: 82,
    competitionIndex: 55,
    smeReserved: true,
    description: '为天河区中小学校采购智慧教育设备，包括智慧黑板、录播系统、校园网络设备等。',
    requirements: ['具有教育信息化产品供应经验', '提供三年质保服务', '需通过教育部教育装备质量检测'],
    contactPerson: '王科长',
    contactPhone: '020-3888****',
  },
  {
    id: 'BID-2026-004',
    title: '深圳市南山区科技园道路绿化养护服务项目',
    publishDate: '2026-01-12',
    deadline: '2026-01-30',
    budget: '380万元',
    region: '广东省深圳市',
    category: '园林绿化',
    source: '深圳市公共资源交易中心',
    status: 'ended',
    matchScore: 75,
    competitionIndex: 28,
    description: '负责南山区科技园片区道路绿化带的日常养护、补植及景观提升工作，服务期限为三年。',
    requirements: ['城市园林绿化企业二级及以上资质', '具有市政道路绿化养护经验', '配备专业养护团队'],
    contactPerson: '陈工',
    contactPhone: '0755-2688****',
  },
  {
    id: 'BID-2026-005',
    title: '北京市朝阳区医院医疗设备采购项目',
    publishDate: '2026-01-22',
    deadline: '2026-02-20',
    budget: '2,150万元',
    region: '北京市朝阳区',
    category: '医疗设备',
    source: '中国政府采购网',
    status: 'new',
    matchScore: 91,
    competitionIndex: 72,
    description: '为朝阳区中心医院采购CT、MRI、超声诊断仪等大型医疗设备，提升医院诊疗能力。',
    requirements: ['具有医疗器械经营许可证', '产品需通过CFDA认证', '提供安装调试及培训服务'],
    contactPerson: '赵处长',
    contactPhone: '010-6588****',
  },
];

// 政策法规数据
export interface PolicyInfo {
  id: string;
  title: string;
  publishDate: string;
  department: string;
  category: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
}

export const policyList: PolicyInfo[] = [
  {
    id: 'POL-001',
    title: '关于进一步规范政府采购招标投标活动的通知',
    publishDate: '2026-01-10',
    department: '财政部',
    category: '采购政策',
    summary: '明确政府采购招标投标活动中的评审标准、时限要求及违规处罚措施，提升采购透明度。',
    impact: 'high',
  },
  {
    id: 'POL-002',
    title: '建设工程施工许可管理办法（修订版）',
    publishDate: '2026-01-05',
    department: '住建部',
    category: '工程建设',
    summary: '简化施工许可办理流程，推行电子化审批，缩短审批时限至5个工作日。',
    impact: 'medium',
  },
  {
    id: 'POL-003',
    title: '关于支持中小企业参与政府采购的若干措施',
    publishDate: '2025-12-28',
    department: '工信部',
    category: '扶持政策',
    summary: '提高中小企业预留份额至40%，降低投标保证金比例，简化资格审查要求。',
    impact: 'high',
  },
];

// 采购意向 / 拟建项目（预计 30–90 天内招标）
export interface UpcomingBid {
  id: string;
  title: string;
  region: string;
  estimatedBudget: string;
  category: string;
  expectedDays: number; // 预计多少天内招标
}

export const upcomingBidList: UpcomingBid[] = [
  { id: 'UP-001', title: '某省政务云平台扩容及安全加固项目', region: '浙江省', estimatedBudget: '约 2,000 万元', category: '信息化建设', expectedDays: 45 },
  { id: 'UP-002', title: '某市轨道交通智慧运维系统', region: '广东省广州市', estimatedBudget: '约 1,500 万元', category: '信息化建设', expectedDays: 60 },
  { id: 'UP-003', title: '某区医院综合楼装修改造工程', region: '北京市海淀区', estimatedBudget: '约 800 万元', category: '装修装饰', expectedDays: 30 },
  { id: 'UP-004', title: '某市中小学智慧校园设备采购', region: '江苏省南京市', estimatedBudget: '约 1,200 万元', category: '设备采购', expectedDays: 75 },
  { id: 'UP-005', title: '某区公园绿化提升及养护项目', region: '广东省深圳市', estimatedBudget: '约 500 万元', category: '园林绿化', expectedDays: 90 },
];

// 竞争烈度（按地区，用于热力图）
export interface CompetitionHeatItem {
  region: string;
  level: 'high' | 'medium' | 'low';
  label: string;
}

export const competitionHeatByRegion: CompetitionHeatItem[] = [
  { region: '北京市', level: 'high', label: '高' },
  { region: '上海市', level: 'high', label: '高' },
  { region: '广东省', level: 'medium', label: '中' },
  { region: '浙江省', level: 'medium', label: '中' },
  { region: '江苏省', level: 'medium', label: '中' },
  { region: '四川省', level: 'low', label: '低' },
  { region: '湖北省', level: 'low', label: '低' },
];

// 投标文件模板数据
export interface DocTemplate {
  id: string;
  name: string;
  category: string;
  sections: string[];
}

export const docTemplates: DocTemplate[] = [
  {
    id: 'TPL-001',
    name: '信息化建设项目投标文件',
    category: '信息化建设',
    sections: ['投标函', '法定代表人授权书', '资格证明文件', '技术方案', '商务报价', '项目团队', '业绩证明', '服务承诺'],
  },
  {
    id: 'TPL-002',
    name: '装修装饰工程投标文件',
    category: '装修装饰',
    sections: ['投标函', '企业资质', '设计方案', '施工组织设计', '报价清单', '项目管理团队', '质量保证措施', '安全文明施工'],
  },
  {
    id: 'TPL-003',
    name: '设备采购项目投标文件',
    category: '设备采购',
    sections: ['投标函', '授权书', '产品配置清单', '技术参数响应', '报价明细', '售后服务方案', '供货计划', '业绩证明'],
  },
];

// 生成的投标文件示例
export interface GeneratedDoc {
  projectName: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export const sampleGeneratedDoc: GeneratedDoc = {
  projectName: '杭州市萧山区智慧城市管理平台建设项目',
  sections: [
    {
      title: '一、投标函',
      content: `致：杭州市萧山区政府采购中心

我方已仔细研究了"杭州市萧山区智慧城市管理平台建设项目"的招标文件，包括澄清和修改文件（如有）。我方愿意按照招标文件的规定，提供本项目所需的全部货物和服务。

一、我方投标总报价为：人民币壹仟贰佰叁拾捌万元整（¥12,380,000.00）。

二、我方承诺：
1. 如果我方中标，将严格按照招标文件和投标文件的承诺履行合同义务；
2. 投标有效期为90个日历天，自投标截止日起计算；
3. 我方同意提供招标文件要求的履约保证金。

三、我方声明所递交的全部投标文件内容真实、有效。

投标人（盖章）：XX科技有限公司
法定代表人或授权代表（签字）：
日期：2026年1月25日`
    },
    {
      title: '二、法定代表人授权书',
      content: `本授权书声明：注册于中华人民共和国浙江省杭州市的XX科技有限公司的法定代表人张三，现授权李四为我公司参加"杭州市萧山区智慧城市管理平台建设项目"投标活动的合法代理人。

被授权人在参加上述项目投标活动中所签署的一切文件和处理与之有关的一切事务，我公司均予以承认。

被授权人无转委权。

授权期限：自本授权书签署之日起至本项目采购活动结束。

法定代表人签字：
被授权人签字：
公司盖章：
日期：2026年1月25日`
    },
    {
      title: '三、技术方案',
      content: `1. 项目理解与需求分析

1.1 项目背景
萧山区作为杭州市的重要组成部分，城市管理面临着人口增长、城市扩张带来的挑战。本项目旨在通过建设智慧城市管理平台，整合各类城市管理资源，提升城市管理的智能化水平。

1.2 建设目标
- 建立统一的城市运行监测中心
- 实现跨部门数据共享与业务协同
- 提升城市事件响应处置效率
- 为领导决策提供数据支撑

2. 总体技术架构

2.1 架构设计原则
- 安全可靠：采用国产化技术栈，确保系统安全
- 开放扩展：采用微服务架构，支持功能扩展
- 高效协同：统一数据标准，实现跨部门协作

2.2 技术架构图
系统采用"1+4+N"架构：
- 1个数据中台：统一数据治理与服务
- 4大支撑平台：物联感知、视频AI、GIS地图、统一门户
- N个业务应用：城市管理、公共服务、应急指挥等

3. 核心功能模块

3.1 城市运行监测
- 实时数据采集与展示
- 关键指标预警告警
- 趋势分析与预测

3.2 事件协同处置
- 事件上报与分拨
- 多部门协同处理
- 处置过程跟踪

3.3 决策支持分析
- 数据可视化大屏
- 多维度统计报表
- 智能辅助决策`
    },
    {
      title: '四、商务报价',
      content: `报价汇总表

项目名称：杭州市萧山区智慧城市管理平台建设项目
投标总价：人民币 12,380,000.00 元

分项报价明细：

1. 软件平台开发
   - 数据中台建设：2,800,000.00 元
   - 业务应用系统：3,200,000.00 元
   - 移动端应用：800,000.00 元
   小计：6,800,000.00 元

2. 硬件设备采购
   - 服务器及存储：2,100,000.00 元
   - 网络设备：580,000.00 元
   - 大屏显示系统：900,000.00 元
   小计：3,580,000.00 元

3. 系统集成与实施
   - 系统部署调试：600,000.00 元
   - 数据迁移整合：400,000.00 元
   - 培训服务：200,000.00 元
   小计：1,200,000.00 元

4. 运维服务（一年）
   小计：800,000.00 元

合计：12,380,000.00 元（大写：人民币壹仟贰佰叁拾捌万元整）

注：以上报价已包含所有税费。`
    },
    {
      title: '五、项目团队',
      content: `1. 项目组织架构

本项目将组建专业的项目实施团队，由公司副总经理担任项目总监，下设项目经理、技术负责人、质量负责人等核心岗位。

2. 核心成员介绍

2.1 项目经理：王工
- 职称：高级项目管理师
- 经验：15年IT项目管理经验
- 业绩：主持完成10余个智慧城市项目

2.2 技术负责人：刘工
- 职称：系统架构师
- 经验：12年系统开发经验
- 专长：大数据平台、微服务架构

2.3 实施负责人：陈工
- 职称：高级工程师
- 经验：10年项目实施经验
- 专长：系统集成、数据治理

3. 团队配置
- 项目管理：3人
- 系统设计：5人
- 软件开发：15人
- 测试工程师：5人
- 实施运维：8人
合计：36人`
    },
    {
      title: '六、服务承诺',
      content: `1. 质量承诺
- 系统可用性达到99.9%以上
- 关键业务响应时间小于3秒
- 所有功能100%满足招标要求

2. 工期承诺
- 严格按照招标文件要求的工期完成项目建设
- 关键里程碑节点提前报告进度
- 如遇特殊情况及时沟通调整

3. 售后服务承诺
- 提供7×24小时技术支持服务
- 重大故障2小时内响应，4小时内到达现场
- 免费提供一年系统运维服务
- 定期进行系统巡检和优化

4. 培训承诺
- 提供完善的用户操作培训
- 提供系统管理员专项培训
- 提供完整的培训文档和视频教程

5. 保密承诺
- 严格遵守国家信息安全相关法律法规
- 对项目涉及的所有数据和信息保密
- 项目结束后移交全部技术文档`
    },
  ],
};

// 复盘数据
export interface ReviewData {
  id: string;
  projectName: string;
  bidDate: string;
  openBidDate: string;   // 开标日期
  winningDate: string;  // 中标日期
  result: 'win' | 'lose';
  ourPrice: string;
  winningPrice: string;
  analysis: string;
  lessons: string[];
}

export const reviewList: ReviewData[] = [
  {
    id: 'REV-001',
    projectName: '某市政务云平台建设项目',
    bidDate: '2025-12-10',
    openBidDate: '2025-12-15',
    winningDate: '2025-12-18',
    result: 'win',
    ourPrice: '1,580万元',
    winningPrice: '1,580万元',
    analysis: '技术方案获得高分评价，团队资质和业绩优势明显，报价策略合理。',
    lessons: ['继续保持技术方案的深度和创新性', '加强同类项目业绩积累', '定价策略经验可复制到类似项目'],
  },
  {
    id: 'REV-002',
    projectName: '某区智慧交通管理系统项目',
    bidDate: '2025-11-15',
    openBidDate: '2025-11-20',
    winningDate: '2025-11-25',
    result: 'lose',
    ourPrice: '920万元',
    winningPrice: '780万元',
    analysis: '报价高于中标价18%，技术方案评分相近，价格因素导致落标。',
    lessons: ['加强成本控制能力', '深入研究竞争对手报价策略', '考虑采用更有竞争力的硬件配置方案'],
  },
];

// 统计数据
export interface Statistics {
  totalBids: number;
  newBidsToday: number;
  trackingBids: number;
  winRate: number;
  totalAmount: string;
}

export const statistics: Statistics = {
  totalBids: 1256,
  newBidsToday: 48,
  trackingBids: 23,
  winRate: 35.8,
  totalAmount: '2.8亿元',
};
