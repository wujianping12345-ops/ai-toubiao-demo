import { useState } from 'react';
import {
  Search,
  Sparkles,
  Target,
  Star,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Users,
  Shield,
} from 'lucide-react';
import { bidInfoList } from '../../data/mockData';

const samplePlans = [
  {
    id: 'PLAN-001',
    name: '智慧城市标准方案A',
    matchScore: 95,
    features: ['微服务架构', '国产化适配', '数据中台'],
    winRate: '42%',
    usedCount: 23,
  },
  {
    id: 'PLAN-002',
    name: '智慧城市标准方案B',
    matchScore: 88,
    features: ['传统架构', '快速部署', '成本优化'],
    winRate: '38%',
    usedCount: 18,
  },
  {
    id: 'PLAN-003',
    name: '智慧城市创新方案',
    matchScore: 82,
    features: ['AI能力', '创新加分', '差异化竞争'],
    winRate: '35%',
    usedCount: 12,
  },
];

const evaluationCriteria = [
  { name: '技术方案', weight: 40, score: 36, maxScore: 40 },
  { name: '商务报价', weight: 30, score: 27, maxScore: 30 },
  { name: '企业资质', weight: 15, score: 14, maxScore: 15 },
  { name: '业绩案例', weight: 10, score: 8, maxScore: 10 },
  { name: '服务承诺', weight: 5, score: 5, maxScore: 5 },
];

// 项目需求深度分析数据
const requirementAnalysis = {
  explicit: [
    { item: '系统集成一级资质', status: 'match', note: '企业已具备' },
    { item: '近三年类似项目经验', status: 'match', note: '有5个相关案例' },
    { item: '高级项目管理师证书', status: 'match', note: '王工具备资质' },
    { item: '国产化适配要求', status: 'partial', note: '需补充信创方案' },
  ],
  implicit: [
    { item: '甲方偏好微服务架构', reason: '分析历史中标方案得出', confidence: 85 },
    { item: '预算倾向控制在90%-95%', reason: '同区域项目数据分析', confidence: 78 },
    { item: '重视运维服务承诺', reason: '招标文件权重分析', confidence: 92 },
    { item: '对响应时间敏感', reason: '需求描述关键词提取', confidence: 75 },
  ],
};

// 竞争对手分析数据
const competitorAnalysis = [
  { name: '竞争对手A', strength: '价格优势', weakness: '业绩偏少', winProb: 25 },
  { name: '竞争对手B', strength: '本地化服务', weakness: '技术方案一般', winProb: 20 },
  { name: '竞争对手C', strength: '资质齐全', weakness: '报价偏高', winProb: 15 },
];

export default function PlanCustom() {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>('PLAN-001');

  const totalScore = evaluationCriteria.reduce((sum, c) => sum + c.score, 0);
  const maxTotalScore = evaluationCriteria.reduce((sum, c) => sum + c.maxScore, 0);
  const estimatedWinRate = Math.round((totalScore / maxTotalScore) * 100 * 0.45 + 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">方案定制系统</h1>
        <p className="text-gray-500 mt-1">
          AI智能匹配最优方案，预测评分提升中标率
        </p>
      </div>

      <div className="flex gap-6 items-start">
        {/* 左侧方案选择 - Sticky */}
        <div className="w-[400px] flex flex-col gap-4 sticky top-24">
          {/* 项目选择 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              选择目标项目
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full appearance-none pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">选择项目进行方案匹配...</option>
                {bidInfoList.map((bid) => (
                  <option key={bid.id} value={bid.id}>
                    {bid.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* AI推荐方案 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden max-h-[calc(100vh-20rem)]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="font-medium text-gray-800">AI推荐方案</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-3">
                {samplePlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'border-primary-500 bg-primary-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-800">
                            {plan.name}
                          </h4>
                          {plan.matchScore >= 90 && (
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                              最佳匹配
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            历史中标率 {plan.winRate}
                          </span>
                          <span>使用 {plan.usedCount} 次</span>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          plan.matchScore >= 90
                            ? 'text-green-600'
                            : plan.matchScore >= 80
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {plan.matchScore}分
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {plan.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧内容 - 单页滚动模式 */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Section 1: 评分预测 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">评分预测分析</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-12">
                {/* 总分环形图 */}
                <div className="relative w-40 h-40 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${(totalScore / maxTotalScore) * 440} 440`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">
                      {totalScore}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">预测得分</span>
                  </div>
                </div>

                {/* 分项得分 */}
                <div className="flex-1 space-y-4">
                  {evaluationCriteria.map((criteria, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 font-medium">{criteria.name}</span>
                        <span className="text-gray-800 font-bold">
                          {criteria.score}/{criteria.maxScore}
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-primary-500 shadow-sm"
                          style={{
                            width: `${(criteria.score / criteria.maxScore) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 预测中标率 */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm font-medium">AI 综合预测中标概率</p>
                      <p className="text-3xl font-black">{estimatedWinRate}%</p>
                    </div>
                  </div>
                  <div className="text-right border-l border-white/20 pl-8">
                    <p className="text-xs text-blue-100 font-bold uppercase tracking-wider mb-1">排名预测</p>
                    <p className="text-2xl font-bold text-white">第 2-3 名</p>
                    <p className="text-[10px] text-blue-200 mt-1">预计参与企业：6-8 家</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 需求分析 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-800">项目需求深度分析</h3>
            </div>
            <div className="p-6 space-y-8">
              {/* 显性需求 */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  显性资质与要求匹配
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {requirementAnalysis.explicit.map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        {req.status === 'match' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-700 font-medium">{req.item}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                        req.status === 'match' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 隐性需求 */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-purple-600">
                  <Sparkles className="w-4 h-4" />
                  AI 识别隐性偏好与痛点
                </h4>
                <div className="space-y-3">
                  {requirementAnalysis.implicit.map((req, index) => (
                    <div key={index} className="p-4 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{req.item}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">置信度</span>
                          <span className="text-sm font-black text-purple-600">{req.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">分析依据：{req.reason}</p>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                          style={{ width: `${req.confidence}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: 竞争分析 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <Users className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">竞争态势与对手分析</h3>
            </div>
            <div className="p-6 space-y-8">
              {/* 竞争对手列表 */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-500" />
                  预测主要竞争对手画像
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {competitorAnalysis.map((comp, index) => (
                    <div key={index} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 font-bold text-gray-400 shadow-sm group-hover:text-orange-500 transition-colors">
                            {index + 1}
                          </div>
                          <span className="font-bold text-lg text-gray-800">{comp.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-orange-600">{comp.winProb}%</span>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">中标概率</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-sm mb-4">
                        <div className="p-3 bg-green-50 rounded-xl border border-green-100/50">
                          <span className="text-green-700 font-bold flex items-center gap-1.5 mb-1"><CheckCircle className="w-3.5 h-3.5" /> 核心优势</span>
                          <p className="text-gray-600 font-medium">{comp.strength}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl border border-red-100/50">
                          <span className="text-red-700 font-bold flex items-center gap-1.5 mb-1"><AlertTriangle className="w-3.5 h-3.5" /> 潜在弱点</span>
                          <p className="text-gray-600 font-medium">{comp.weakness}</p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-orange-500 shadow-sm"
                          style={{ width: `${comp.winProb}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 我方优势 */}
              <div className="p-6 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100%] -z-0"></div>
                <h4 className="font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
                  <Shield className="w-6 h-6" />
                  我方竞争差异化优势
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {[
                    { item: '技术方案创新性强', weight: '高' },
                    { item: '同类项目业绩丰富', weight: '高' },
                    { item: '本地化服务团队', weight: '中' },
                    { item: '价格具有竞争力', weight: '中' },
                  ].map((adv, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <span className="text-sm font-bold">{adv.item}</span>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                        adv.weight === '高' ? 'bg-green-400 text-green-950' : 'bg-blue-400 text-blue-950'
                      }`}>
                        {adv.weight}权重
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 优化建议 - 始终展示在底部 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <Zap className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-gray-800">AI 智能优化提升建议</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    title: '技术方案优化',
                    desc: '建议增加国产化替代方案描述，可提升技术分 2-3 分',
                    impact: '+2.5分',
                    priority: 'high',
                  },
                  {
                    title: '业绩案例补充',
                    desc: '建议补充近期智慧城市相关业绩案例，至少增加 3 个同类案例',
                    impact: '+1.5分',
                    priority: 'medium',
                  },
                  {
                    title: '报价策略调整',
                    desc: '根据同区域历史中标均价，建议报价控制在预算的 92%-95% 区间',
                    impact: '+2分',
                    priority: 'high',
                  },
                  {
                    title: '服务承诺强化',
                    desc: '建议增加 24 小时在线响应承诺和免费运维期延长至 24 个月',
                    impact: '+0.5分',
                    priority: 'low',
                  },
                ].map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-5 border border-gray-100 rounded-2xl hover:bg-orange-50/30 hover:border-orange-200 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                            {suggestion.title}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                              suggestion.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : suggestion.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {suggestion.priority === 'high' ? 'High' : suggestion.priority === 'medium' ? 'Med' : 'Low'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 font-medium">
                          {suggestion.desc}
                        </p>
                      </div>
                      <div className="text-green-600 font-black text-lg">
                        {suggestion.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}