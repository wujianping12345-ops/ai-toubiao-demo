import { useState } from 'react';
import {
  BarChart3,
  Target,
  Award,
  XCircle,
  PieChart,
  Calendar,
  DollarSign,
  Lightbulb,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { reviewList } from '../../data/mockData';

const monthlyStats = [
  { month: '2025-07', total: 12, win: 4, rate: 33 },
  { month: '2025-08', total: 15, win: 6, rate: 40 },
  { month: '2025-09', total: 18, win: 7, rate: 39 },
  { month: '2025-10', total: 14, win: 5, rate: 36 },
  { month: '2025-11', total: 16, win: 6, rate: 38 },
  { month: '2025-12', total: 20, win: 8, rate: 40 },
];

const categoryStats = [
  { name: '信息化建设', count: 35, winCount: 15, rate: 43 },
  { name: '装修装饰', count: 28, winCount: 10, rate: 36 },
  { name: '设备采购', count: 22, winCount: 8, rate: 36 },
  { name: '园林绿化', count: 18, winCount: 6, rate: 33 },
  { name: '其他', count: 12, winCount: 3, rate: 25 },
];

const loseReasons = [
  { reason: '报价偏高', count: 18, percent: 42 },
  { reason: '技术方案不足', count: 12, percent: 28 },
  { reason: '资质不满足', count: 7, percent: 16 },
  { reason: '业绩案例缺乏', count: 4, percent: 9 },
  { reason: '其他原因', count: 2, percent: 5 },
];

const winFactors = [
  { factor: '技术方案创新', contribution: 35 },
  { factor: '报价策略合理', contribution: 28 },
  { factor: '业绩案例丰富', contribution: 20 },
  { factor: '服务承诺到位', contribution: 12 },
  { factor: '团队资质优秀', contribution: 5 },
];

const competitorIntel = [
  { name: 'A公司', bidCount: 45, winRate: 38, avgPriceRatio: 0.92, strength: '价格优势' },
  { name: 'B公司', bidCount: 38, winRate: 35, avgPriceRatio: 0.95, strength: '本地化' },
  { name: 'C公司', bidCount: 32, winRate: 31, avgPriceRatio: 0.88, strength: '技术实力' },
  { name: '我方', bidCount: 95, winRate: 38, avgPriceRatio: 0.93, strength: '综合能力' },
];

const detailedReviewList = [
  ...reviewList,
  {
    id: 'REV-003',
    projectName: '某市数字政府平台建设项目',
    bidDate: '2025-10-28',
    result: 'win' as const,
    ourPrice: '2,380万元',
    winningPrice: '2,380万元',
    analysis: '技术方案获得专家一致好评，创新点突出，团队配置合理，报价策略精准。',
    lessons: ['创新方案是制胜关键', '提前了解评委偏好很重要', '合理的人员配置加分明显'],
  },
  {
    id: 'REV-004',
    projectName: '某区智慧社区管理系统',
    bidDate: '2025-09-15',
    result: 'lose' as const,
    ourPrice: '680万元',
    winningPrice: '550万元',
    analysis: '报价高于中标价23.6%，虽然技术方案评分较高但价格差距过大。',
    lessons: ['需要更精准的成本控制', '低价中标项目需调整策略', '考虑硬件云化降低成本'],
  },
  {
    id: 'REV-005',
    projectName: '某医院信息化升级项目',
    bidDate: '2025-08-20',
    result: 'win' as const,
    ourPrice: '1,150万元',
    winningPrice: '1,150万元',
    analysis: '医疗行业经验丰富，案例支撑有力，客户对方案认可度高。',
    lessons: ['垂直行业深耕价值显现', '老客户项目延续性好', '专业团队配置很重要'],
  },
];

export default function Review() {
  const [selectedReview, setSelectedReview] = useState(detailedReviewList[0]);

  const totalBids = monthlyStats.reduce((sum, m) => sum + m.total, 0);
  const totalWins = monthlyStats.reduce((sum, m) => sum + m.win, 0);
  const avgWinRate = Math.round((totalWins / totalBids) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">投标复盘系统</h1>
        <p className="text-gray-500 mt-1">
          AI分析历史投标数据，总结经验提升中标率
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">累计投标</p>
              <p className="text-xl font-semibold text-gray-800">{totalBids} 次</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">中标次数</p>
              <p className="text-xl font-semibold text-gray-800">{totalWins} 次</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">平均中标率</p>
              <p className="text-xl font-semibold text-gray-800">{avgWinRate}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">中标总额</p>
              <p className="text-xl font-semibold text-gray-800">2.8亿</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        
        {/* Section 1: 数据概览 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">数据概览与多维分析</h2>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 月度趋势 */}
              <div className="border border-gray-100 rounded-xl p-5">
                <h3 className="font-medium text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  月度投标趋势
                </h3>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-20 text-sm text-gray-500">{stat.month}</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
                        <div
                          className="h-full bg-green-500 shadow-sm"
                          style={{ width: `${(stat.win / stat.total) * 100}%` }}
                        />
                        <div
                          className="h-full bg-gray-200"
                          style={{ width: `${((stat.total - stat.win) / stat.total) * 100}%` }}
                        />
                      </div>
                      <span className="w-16 text-sm text-right">
                        <span className="text-green-600 font-bold">{stat.win}</span>
                        <span className="text-gray-400">/{stat.total}</span>
                      </span>
                      <span className="w-12 text-sm text-gray-600 text-right font-medium">
                        {stat.rate}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 分类统计 */}
              <div className="border border-gray-100 rounded-xl p-5">
                <h3 className="font-medium text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  项目类型分析
                </h3>
                <div className="space-y-5">
                  {categoryStats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">{stat.name}</span>
                        <span className="text-gray-500">
                          中标率 <span className="text-primary-600 font-bold">{stat.rate}%</span>
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-primary-500"
                          style={{ width: `${stat.rate}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        投标 {stat.count} 次，中标 {stat.winCount} 次
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 失标原因与中标因素分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 失标原因 */}
              <div className="border border-gray-100 rounded-xl p-5">
                <h3 className="font-medium text-gray-800 mb-6 flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5" />
                  失标原因分析
                </h3>
                <div className="space-y-4">
                  {loseReasons.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-28 text-sm text-gray-600 font-medium">{item.reason}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-red-400"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-20 text-right">{item.count}次 ({item.percent}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中标成功因素 */}
              <div className="border border-gray-100 rounded-xl p-5">
                <h3 className="font-medium text-gray-800 mb-6 flex items-center gap-2 text-green-600">
                  <Award className="w-5 h-5" />
                  中标成功因素
                </h3>
                <div className="space-y-4">
                  {winFactors.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-28 text-sm text-gray-600 font-medium">{item.factor}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-green-400"
                          style={{ width: `${item.contribution}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">{item.contribution}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 竞争对手分析 */}
            <div className="border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-gray-800 mb-6 flex items-center gap-2 text-orange-600">
                <Users className="w-5 h-5" />
                主要竞争对手对比
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left text-sm font-bold text-gray-500 py-4 px-4">企业</th>
                      <th className="text-center text-sm font-bold text-gray-500 py-4 px-4">投标次数</th>
                      <th className="text-center text-sm font-bold text-gray-500 py-4 px-4">中标率</th>
                      <th className="text-center text-sm font-bold text-gray-500 py-4 px-4">平均报价比</th>
                      <th className="text-center text-sm font-bold text-gray-500 py-4 px-4">核心优势</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorIntel.map((comp, index) => (
                      <tr key={index} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${comp.name === '我方' ? 'bg-blue-50/30' : ''}`}>
                        <td className="py-4 px-4">
                          <span className={`text-sm font-bold ${comp.name === '我方' ? 'text-blue-700' : 'text-gray-700'}`}>
                            {comp.name}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4 text-sm text-gray-600 font-medium">{comp.bidCount}</td>
                        <td className="text-center py-4 px-4">
                          <span className={`text-sm font-bold ${
                            comp.winRate >= 38 ? 'text-green-600' : comp.winRate >= 35 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {comp.winRate}%
                          </span>
                        </td>
                        <td className="text-center py-4 px-4 text-sm text-gray-600">{((comp.avgPriceRatio) * 100).toFixed(0)}%</td>
                        <td className="text-center py-4 px-4">
                          <span className="text-xs px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium">{comp.strength}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 复盘详情 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">详细复盘记录</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 复盘列表 */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 px-1">
                <FileText className="w-5 h-5 text-blue-600" />
                历史复盘列表
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {detailedReviewList.map((review) => (
                  <div
                    key={review.id}
                    onClick={() => setSelectedReview(review)}
                    className={`p-5 border rounded-2xl cursor-pointer transition-all ${
                      selectedReview.id === review.id
                        ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/10'
                        : 'border-gray-100 bg-gray-50/30 hover:border-blue-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {review.result === 'win' ? (
                            <Award className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <h4 className="font-bold text-gray-800 text-sm">
                            {review.projectName}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {review.bidDate}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> 我方报价: {review.ourPrice}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          review.result === 'win'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {review.result === 'win' ? '中标' : '未中标'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 复盘详情 */}
            <div className="border border-gray-100 rounded-2xl p-8 bg-gray-50/30">
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                {selectedReview.result === 'win' ? (
                  <div className="p-2 bg-green-100 rounded-xl"><Award className="w-6 h-6 text-green-600" /></div>
                ) : (
                  <div className="p-2 bg-red-100 rounded-xl"><XCircle className="w-6 h-6 text-red-600" /></div>
                )}
                AI 深度复盘报告
              </h3>

              <div className="space-y-8">
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">项目名称</p>
                  <p className="text-xl font-bold text-gray-800 leading-tight">{selectedReview.projectName}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div>
                    <p className="text-xs text-gray-400 font-bold mb-1">我方报价</p>
                    <p className="text-xl font-bold text-blue-600">{selectedReview.ourPrice}</p>
                  </div>
                  <div className="border-l border-gray-100 pl-8">
                    <p className="text-xs text-gray-400 font-bold mb-1">中标价格</p>
                    <p className="text-xl font-bold text-gray-800">{selectedReview.winningPrice}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" /> AI 分析结论
                  </p>
                  <p className="text-gray-700 leading-relaxed bg-white p-5 rounded-2xl border border-gray-100 shadow-sm italic">
                    “{selectedReview.analysis}”
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-500" /> 核心经验教训
                  </p>
                  <ul className="space-y-3">
                    {selectedReview.lessons.map((lesson, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 font-medium">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: AI 洞察 */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">AI 智能洞察与行动建议</h2>
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-5">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 px-1">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  战略洞察报告
                </h3>
                {[
                  {
                    title: '报价策略优化',
                    content: '根据近6个月数据分析，您的报价普遍偏高5-10%。建议在信息化建设类项目中，将报价控制在预算的90-93%区间，可提升中标率约8%。',
                    type: 'warning',
                    impact: '+8%中标率',
                  },
                  {
                    title: '优势领域识别',
                    content: '信息化建设类项目中标率最高(43%)，建议继续深耕该领域。同时可考虑拓展智慧城市、数字政府等细分赛道。',
                    type: 'success',
                    impact: '战略聚焦',
                  },
                  {
                    title: '技术方案提升',
                    content: '在落标项目中，技术方案得分普遍低于中标方2-3分。建议加强创新点描述和差异化竞争策略。',
                    type: 'info',
                    impact: '+2-3分',
                  },
                  {
                    title: '资质补强建议',
                    content: '部分项目因缺少CMMI3级认证而失去竞标机会，建议尽快完成资质认证，预计可增加15%的投标机会。',
                    type: 'warning',
                    impact: '+15%机会',
                  },
                ].map((insight, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border-l-4 shadow-sm ${
                      insight.type === 'success'
                        ? 'bg-green-50 border-green-500'
                        : insight.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <Lightbulb className={`w-4 h-4 ${
                          insight.type === 'success'
                            ? 'text-green-600'
                            : insight.type === 'warning'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`} />
                        {insight.title}
                      </h4>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${
                        insight.type === 'success'
                          ? 'bg-white text-green-700 border border-green-200'
                          : insight.type === 'warning'
                          ? 'bg-white text-yellow-700 border border-yellow-200'
                          : 'bg-white text-blue-700 border border-blue-200'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">{insight.content}</p>
                  </div>
                ))}
              </div>

              {/* 行动建议 */}
              <div className="space-y-6">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 px-1">
                  <Target className="w-5 h-5 text-orange-600" />
                  近期优化行动计划
                </h3>

                <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    短期行动（1个月内）
                  </h4>
                  <div className="space-y-3">
                    {[
                      { action: '调整报价策略，控制在预算90-93%', status: 'pending', priority: 'high' },
                      { action: '完善技术方案模板，增加创新点', status: 'in_progress', priority: 'high' },
                      { action: '整理近期优秀案例，丰富业绩库', status: 'done', priority: 'medium' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group transition-all hover:bg-blue-50">
                        {item.status === 'done' ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : item.status === 'in_progress' ? (
                          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                        )}
                        <span className={`text-sm flex-1 font-medium ${item.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                          {item.action}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.priority === 'high' ? 'High' : 'Med'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    中长期计划
                  </h4>
                  <div className="space-y-3">
                    {[
                      { action: '启动CMMI3级认证申请流程', priority: 'high' },
                      { action: '建立竞争对手情报跟踪机制', priority: 'medium' },
                      { action: '组建专业化的智慧城市团队', priority: 'medium' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all">
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm flex-1 text-gray-700 font-medium">{item.action}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.priority === 'high' ? 'High' : 'Med'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 预期效果 */}
                <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl text-white shadow-lg shadow-green-200">
                  <h4 className="font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                    执行后预期提升
                  </h4>
                  <div className="grid grid-cols-2 gap-6 divide-x divide-white/20">
                    <div className="text-center">
                      <p className="text-3xl font-black mb-1">45%</p>
                      <p className="text-[10px] uppercase font-bold text-white/70">预期中标率</p>
                      <p className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mt-2">↑ 7% 提升</p>
                    </div>
                    <div className="text-center pl-6 border-l border-white/20">
                      <p className="text-3xl font-black mb-1">3.5亿</p>
                      <p className="text-[10px] uppercase font-bold text-white/70">预期中标额</p>
                      <p className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full inline-block mt-2">↑ 25% 增长</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 知识库更新建议 */}
            <div className="border border-gray-100 rounded-2xl p-8 bg-gray-50/30">
              <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                投标知识库核心更新建议
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: '技术方案库',
                    items: ['新增智慧城市方案模板', '更新数字政府最佳实践'],
                    count: 156,
                    newCount: 12,
                    color: 'blue'
                  },
                  {
                    title: '报价参考库',
                    items: ['更新人力成本基准', '调整硬件价格参数'],
                    count: 89,
                    newCount: 8,
                    color: 'indigo'
                  },
                  {
                    title: '业绩案例库',
                    items: ['整理近期中标案例', '补充客户评价材料'],
                    count: 234,
                    newCount: 15,
                    color: 'purple'
                  },
                ].map((lib, index) => (
                  <div key={index} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-800">{lib.title}</h4>
                      <span className={`text-[10px] px-2 py-1 bg-${lib.color}-50 text-${lib.color}-600 rounded-lg font-bold border border-${lib.color}-100`}>
                        +{lib.newCount} NEW
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {lib.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                       <span className="text-[10px] text-gray-400 font-bold">TOTAL ASSETS</span>
                       <span className="text-sm font-black text-gray-800">{lib.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}