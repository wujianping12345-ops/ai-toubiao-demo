import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BookOpen,
  Building,
  Scale,
  ChevronRight,
  BarChart3,
  Map
} from 'lucide-react';
import { policyList } from '../../data/mockData';

const regionPolicies = [
  { region: '浙江省', count: 156, trend: 'up', focus: '数字化改革、绿色建筑' },
  { region: '广东省', count: 142, trend: 'up', focus: '大湾区建设、智慧城市' },
  { region: '江苏省', count: 128, trend: 'stable', focus: '制造业升级、产业园区' },
  { region: '北京市', count: 98, trend: 'up', focus: '城市更新、科技创新' },
  { region: '上海市', count: 89, trend: 'stable', focus: '自贸区建设、金融科技' },
];

export default function PreLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">前置布局系统</h1>
        <p className="text-gray-500 mt-1">
          政策法规智能分析，提前布局投标策略
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">政策法规库</p>
              <p className="text-xl font-semibold text-gray-800">2,368</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">覆盖省市</p>
              <p className="text-xl font-semibold text-gray-800">31</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Scale className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">本周新增</p>
              <p className="text-xl font-semibold text-gray-800">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">重要更新</p>
              <p className="text-xl font-semibold text-gray-800">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Section 1: 趋势预测 (Formerly Analysis Tab) */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">趋势预测与洞察</h2>
          </div>

          <div className="space-y-6">
            {/* 市场趋势预测 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  招标市场趋势预测
                </h3>
                <div className="space-y-4">
                  {[
                    { period: '2026年Q1', volume: 12800, growth: '+15%', trend: 'up' },
                    { period: '2026年Q2', volume: 14200, growth: '+11%', trend: 'up' },
                    { period: '2026年Q3', volume: 13500, growth: '-5%', trend: 'down' },
                    { period: '2026年Q4', volume: 15800, growth: '+17%', trend: 'up' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.period}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${(item.volume / 16000) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">{item.volume.toLocaleString()}</span>
                        <span className={`text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                          {item.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">* 基于历史数据和宏观经济指标的AI预测</p>
              </div>

              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  行业热点预警
                </h3>
                <div className="space-y-3">
                  {[
                    { industry: '智慧城市', heat: 95, change: '+12%', status: 'hot' },
                    { industry: '新能源基建', heat: 88, change: '+18%', status: 'rising' },
                    { industry: '数字政府', heat: 82, change: '+8%', status: 'stable' },
                    { industry: '医疗信息化', heat: 78, change: '+15%', status: 'rising' },
                    { industry: '教育装备', heat: 65, change: '-3%', status: 'cooling' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-gray-700">{item.industry}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.status === 'hot' ? 'bg-red-500' :
                            item.status === 'rising' ? 'bg-orange-500' :
                            item.status === 'stable' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${item.heat}%` }}
                        />
                      </div>
                      <span className={`text-xs w-12 text-right ${
                        item.change.startsWith('+') ? 'text-green-600' : 'text-red-500'
                      }`}>{item.change}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'hot' ? 'bg-red-100 text-red-700' :
                        item.status === 'rising' ? 'bg-orange-100 text-orange-700' :
                        item.status === 'stable' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status === 'hot' ? '热门' : item.status === 'rising' ? '上升' : item.status === 'stable' ? '稳定' : '下降'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 竞争态势分析 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-600" />
                竞争态势分析
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: '市场集中度',
                    value: 'CR4: 35%',
                    desc: '前四大企业市占率',
                    trend: '竞争较为分散，中小企业机会多',
                    color: 'green'
                  },
                  {
                    title: '平均中标率',
                    value: '28.5%',
                    desc: '行业平均水平',
                    trend: '您的中标率高于行业平均7.3%',
                    color: 'blue'
                  },
                  {
                    title: '价格竞争指数',
                    value: '0.72',
                    desc: '价格敏感度',
                    trend: '价格因素影响显著，建议优化成本',
                    color: 'orange'
                  },
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg bg-${item.color}-50 border border-${item.color}-100`}>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className={`text-2xl font-semibold text-${item.color}-600 mt-1`}>{item.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    <p className={`text-xs text-${item.color}-600 mt-2 pt-2 border-t border-${item.color}-100`}>{item.trend}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI布局建议 */}
            <div className="border border-gray-100 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                AI前置布局建议
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: '资质储备建议',
                    items: ['建议申请CMMI3级认证，预计增加15%投标机会', '考虑获取信息安全等级保护资质', '补充绿色建筑设计资质'],
                    priority: 'high'
                  },
                  {
                    title: '区域布局建议',
                    items: ['重点关注浙江省数字化改革项目', '广东省大湾区基建投入加大', '建议在江苏设立分支机构'],
                    priority: 'medium'
                  },
                  {
                    title: '合作资源储备',
                    items: ['推荐与华为、阿里云建立合作关系', '储备BIM技术服务供应商', '建立施工分包商资源库'],
                    priority: 'medium'
                  },
                  {
                    title: '技术能力提升',
                    items: ['加强AI大模型应用能力', '储备数字孪生技术团队', '建立低代码开发平台'],
                    priority: 'high'
                  },
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.priority === 'high' ? '优先' : '建议'}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {item.items.map((li, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 区域分析 (Formerly Region Tab) */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Map className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">区域热度分析</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionPolicies.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{item.region}</h3>
                  <div className="flex items-center gap-1">
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-2xl font-semibold text-primary-600">
                  {item.count}
                </p>
                <p className="text-xs text-gray-500 mt-1">相关政策</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">重点领域</p>
                  <p className="text-sm text-gray-700 mt-1">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 政策法规 (Formerly Policy Tab) */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">最新政策法规库</h2>
          </div>

          <div>
            {/* 搜索栏 */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索政策法规..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                筛选
              </button>
            </div>

            {/* 政策列表 */}
            <div className="space-y-3">
              {policyList.map((policy) => (
                <div
                  key={policy.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-800">
                          {policy.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            policy.impact === 'high'
                              ? 'bg-red-100 text-red-700'
                              : policy.impact === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {policy.impact === 'high'
                            ? '重要'
                            : policy.impact === 'medium'
                            ? '一般'
                            : '了解'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {policy.summary}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>{policy.department}</span>
                        <span>{policy.publishDate}</span>
                        <span>{policy.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}