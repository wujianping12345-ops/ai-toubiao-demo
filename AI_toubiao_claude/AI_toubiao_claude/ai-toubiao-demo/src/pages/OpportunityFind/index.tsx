import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Banknote,
  Calendar,
  ChevronRight,
  Compass,
  Zap,
  Megaphone,
  Sparkles,
  Bell,
  X,
} from 'lucide-react';
import { useMembership } from '../../context/MembershipContext';
import { bidInfoList, type BidInfo } from '../../data/mockData';

// 地区列表（按拼音 A-Z 排序）
const REGIONS = [
  '全国',
  '安徽',
  '北京',
  '重庆',
  '福建',
  '甘肃',
  '广东',
  '广西',
  '贵州',
  '海南',
  '河北',
  '河南',
  '黑龙江',
  '湖北',
  '湖南',
  '吉林',
  '江苏',
  '江西',
  '辽宁',
  '内蒙古',
  '宁夏',
  '青海',
  '山东',
  '山西',
  '陕西',
  '上海',
  '四川',
  '天津',
  '西藏',
  '新疆',
  '云南',
  '浙江',
  '香港',
  '澳门',
  '台湾',
];

// 信息类型：一级
const INFO_TYPES = [
  { id: 'all', label: '全部' },
  { id: 'tender', label: '招标' },
  { id: 'win', label: '中标' },
  { id: 'planned', label: '拟在建项目' },
] as const;

// 招标子类型（当一级选「招标」时显示）
const TENDER_SUB_TYPES = [
  { id: 'all', label: '全部招标' },
  { id: 'product', label: '产品招标' },
  { id: 'service', label: '服务招标' },
  { id: 'engineering', label: '工程招标' },
] as const;

// 时间范围
const TIME_RANGES = [
  { id: 'none', label: '不限' },
  { id: 'week', label: '近一周' },
  { id: 'month', label: '近一个月' },
  { id: 'quarter', label: '近三个月' },
  { id: 'halfyear', label: '近半年' },
  { id: 'year', label: '近一年' },
] as const;

// 行业选项（与 mock 数据 category 对齐）
const INDUSTRIES = [
  '全部',
  '信息化建设',
  '装修装饰',
  '设备采购',
  '园林绿化',
  '医疗设备',
  '电力新能源',
];

// 热门搜索
const HOT_KEYWORDS = ['电梯', '雕塑', '泵', '景观', '阀门', '污水', '喷泉', '机场'];

// 类别与信息类型映射（工程/产品/服务）
const CATEGORY_TO_SUB: Record<string, string> = {
  信息化建设: 'engineering',
  装修装饰: 'engineering',
  园林绿化: 'engineering',
  设备采购: 'product',
  医疗设备: 'product',
};

// 项目金额范围（万元）
const AMOUNT_MIN = 0;
const AMOUNT_MAX = 3000;

function parseDate(s: string): number {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}

/** 从预算字符串解析出数值（万元），如 "1,280万元" -> 1280 */
function parseBudget(budgetStr: string): number {
  const num = budgetStr.replace(/[^0-9.]/g, '');
  return Number(num) || 0;
}

export default function OpportunityFind() {
  const navigate = useNavigate();
  const { opportunityLimit, hasAdvancedFilters } = useMembership();
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [region, setRegion] = useState<string>('全国');
  const [infoType, setInfoType] = useState<string>('tender');
  const [tenderSubType, setTenderSubType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');
  const [industry, setIndustry] = useState<string>('全部');
  const [amountMin, setAmountMin] = useState(AMOUNT_MIN);
  const [amountMax, setAmountMax] = useState(AMOUNT_MAX);
  const [matchStrictness, setMatchStrictness] = useState(80);
  const [priorityAttrs, setPriorityAttrs] = useState<string[]>([]);
  const [engineRunning, setEngineRunning] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const SUBSCRIBE_STORAGE_KEY = 'opportunity_subscribe_channels';
  const [subscribeChannels, setSubscribeChannels] = useState<{ wechat: boolean; email: boolean; inApp: boolean }>(() => {
    try {
      const raw = localStorage.getItem(SUBSCRIBE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { wechat?: boolean; email?: boolean; inApp?: boolean };
        return { wechat: !!parsed.wechat, email: !!parsed.email, inApp: parsed.inApp !== false };
      }
    } catch (_) {}
    return { wechat: false, email: false, inApp: true };
  });

  const saveSubscribeChannels = (ch: { wechat: boolean; email: boolean; inApp: boolean }) => {
    setSubscribeChannels(ch);
    try {
      localStorage.setItem(SUBSCRIBE_STORAGE_KEY, JSON.stringify(ch));
    } catch (_) {}
  };

  const setAmountRange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      setAmountMin(value);
      if (value > amountMax) setAmountMax(value);
    } else {
      setAmountMax(value);
      if (value < amountMin) setAmountMin(value);
    }
  };

  const togglePriority = (tag: string) => {
    setPriorityAttrs((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const runMatchEngine = () => {
    setEngineRunning(true);
    setTimeout(() => setEngineRunning(false), 1500);
  };

  const clearFilters = () => {
    setRegion('全国');
    setInfoType('tender');
    setTenderSubType('all');
    setTimeRange('none');
    setIndustry('全部');
    setAmountMin(AMOUNT_MIN);
    setAmountMax(AMOUNT_MAX);
    setKeyword('');
  };

  const handleHotKeyword = (k: string) => {
    setKeyword(k);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const referenceDate = useMemo(() => parseDate('2026-02-01'), []);

  const filteredBids = useMemo(() => {
    let list = bidInfoList;

    if (keyword.trim()) {
      const k = keyword.trim();
      list = list.filter(
        (b) =>
          b.title.includes(k) ||
          b.region.includes(k) ||
          b.category.includes(k)
      );
    }

    if (region !== '全国') {
      list = list.filter((b) => b.region.startsWith(region) || b.region.includes(region));
    }

    if (industry !== '全部') {
      list = list.filter((b) => b.category === industry);
    }

    if (infoType === 'tender' && tenderSubType !== 'all') {
      list = list.filter((b) => (CATEGORY_TO_SUB[b.category] || 'engineering') === tenderSubType);
    }
    if (infoType === 'win') {
      list = list.filter((b) => b.status === 'applied' || b.matchScore >= 85);
    }
    if (infoType === 'planned') {
      list = list.filter((b) => b.status === 'new' || b.status === 'tracking');
    }

    if (timeRange !== 'none') {
      const days: Record<string, number> = {
        week: 7,
        month: 30,
        quarter: 90,
        halfyear: 180,
        year: 365,
      };
      const maxAge = days[timeRange] * 24 * 60 * 60 * 1000;
      list = list.filter((b) => referenceDate - parseDate(b.publishDate) <= maxAge);
    }

    // 项目金额范围过滤（仅高级/尊享会员）
    if (hasAdvancedFilters) {
      list = list.filter((b) => {
        const amount = parseBudget(b.budget);
        return amount >= amountMin && amount <= amountMax;
      });
      list = list.filter((b) => b.matchScore >= matchStrictness);
    }

    return list;
  }, [keyword, region, industry, infoType, tenderSubType, timeRange, referenceDate, amountMin, amountMax, matchStrictness, hasAdvancedFilters]);

  const displayBids = useMemo(() => filteredBids.slice(0, opportunityLimit), [filteredBids, opportunityLimit]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Compass className="w-6 h-6" />
            </div>
            商机寻找
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            全网招标信息实时监控，按企业画像智能筛选高匹配商机。
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-bold text-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          实时监控中
        </div>
      </div>

      {/* 筛选区域 - 参考图片布局 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 热门搜索 + 搜索框 */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 font-medium shrink-0">热门搜索:</span>
            {HOT_KEYWORDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => handleHotKeyword(k)}
                className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
              >
                {k}
              </button>
            ))}
          </div>
          <div className="flex-1 flex gap-2 min-w-0 sm:min-w-[280px]">
            <input
              type="text"
              placeholder="请输入您要搜索的内容"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 disabled:opacity-70 shrink-0"
            >
              <Search className="w-4 h-4" />
              搜索
            </button>
          </div>
        </div>

        {/* 选择地区 */}
        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-3">选择地区:</div>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  region === r
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">说明: 地区按拼音 A-Z 排序</p>
        </div>

        {/* 信息类型 */}
        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-3">信息类型:</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {INFO_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setInfoType(t.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  infoType === t.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {infoType === 'tender' && (
            <div className="flex flex-wrap gap-2">
              {TENDER_SUB_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTenderSubType(t.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    tenderSubType === t.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 选择行业 */}
        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-3">选择行业:</div>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => setIndustry(ind)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  industry === ind
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* 项目金额范围（仅金卡/钻石卡） */}
        {hasAdvancedFilters && (
        <div className="p-6 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-700 mb-4">项目金额范围:</div>
          <div className="flex flex-col gap-6 max-w-xl">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                <span>最低 {amountMin} 万元</span>
                <span>最高 {amountMax} 万元</span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={AMOUNT_MIN}
                  max={AMOUNT_MAX}
                  step={50}
                  value={amountMin}
                  onChange={(e) => setAmountRange('min', Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="range"
                  min={AMOUNT_MIN}
                  max={AMOUNT_MAX}
                  step={50}
                  value={amountMax}
                  onChange={(e) => setAmountRange('max', Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">拖动左右滑块选择金额区间（单位：万元）</p>
          </div>
        </div>
        )}

        {/* 选择时间 + 清空已选条件 */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 shrink-0">选择时间:</span>
            {TIME_RANGES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeRange(t.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  timeRange === t.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">已选条件:</span>
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              清空已选条件
            </button>
            <button
              type="button"
              onClick={() => setShowSubscribeModal(true)}
              className="px-4 py-2 rounded text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              订阅当前筛选 / 新标推送设置
            </button>
          </div>
        </div>
      </div>

      {/* 订阅/推送设置弹窗 */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowSubscribeModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">新标推送设置</h3>
              <button type="button" onClick={() => setShowSubscribeModal(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">当有新标符合当前筛选条件时，将通过以下渠道通知您（演示仅保存设置，不实际推送）。</p>
            <div className="space-y-3 mb-6">
              {[
                { key: 'wechat' as const, label: '微信' },
                { key: 'email' as const, label: '邮件' },
                { key: 'inApp' as const, label: '站内消息' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={subscribeChannels[key]}
                    onChange={(e) => saveSubscribeChannels({ ...subscribeChannels, [key]: e.target.checked })}
                    className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowSubscribeModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => { setShowSubscribeModal(false); }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 今日更新提示条 */}
      <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm">
        <Megaphone className="w-5 h-5 text-amber-600 shrink-0" />
        今日更新了 4037 条招标信息
      </div>

      {/* 智能匹配控制（仅金卡/钻石卡）+ 商机列表 */}
      <div className={hasAdvancedFilters ? 'grid grid-cols-1 lg:grid-cols-4 gap-8' : ''}>
        {hasAdvancedFilters && (
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-black text-gray-900 text-lg mb-6">智能匹配控制</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">匹配严格度</label>
                  <span className="text-xs font-black text-blue-600">{matchStrictness}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={matchStrictness}
                  onChange={(e) => setMatchStrictness(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">优先推荐属性</label>
                <div className="flex flex-col gap-2">
                  {['资质强项优先', '本省业务优先', '高利润率优先'].map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group"
                    >
                      <span className="text-xs font-bold text-gray-600 group-hover:text-blue-700">{tag}</span>
                      <input
                        type="checkbox"
                        checked={priorityAttrs.includes(tag)}
                        onChange={() => togglePriority(tag)}
                        className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={runMatchEngine}
                disabled={engineRunning}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                {engineRunning ? '匹配引擎运行中...' : '重新运行匹配引擎'}
              </button>
            </div>
          </div>
        </div>
        )}

        {/* 商机列表 */}
        <div className={hasAdvancedFilters ? 'lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden' : 'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'}>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              推荐商机列表
              <span className="text-gray-400 font-normal text-sm">
                （共 {displayBids.length} 条{opportunityLimit < filteredBids.length ? `，已限显 ${opportunityLimit} 条` : ''}）
              </span>
            </h2>
            <button
              type="button"
              onClick={() => navigate('/info-collect')}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              前往信息收集与匹配 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {opportunityLimit < filteredBids.length && (
            <div className="px-6 py-2 bg-amber-50 border-b border-amber-100 text-amber-800 text-sm">
              当前会员仅展示前 {opportunityLimit} 条，升级会员可查看更多商机。
            </div>
          )}
          <div className="divide-y divide-gray-50">
            {displayBids.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                暂无符合筛选条件的商机，请调整筛选条件或清空已选条件后重试。
              </div>
            ) : (
              displayBids.map((bid: BidInfo) => (
                <div
                  key={bid.id}
                  className="px-6 py-5 hover:bg-gray-50/50 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center gap-4"
                  onClick={() => navigate('/info-collect')}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {bid.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {bid.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Banknote className="w-4 h-4 text-gray-400" />
                        {bid.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        截止 {bid.deadline}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{bid.source}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-end">
                    {(bid.competitionIndex ?? 50) <= 40 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700" title="高价值低竞争">
                        蓝海
                      </span>
                    )}
                    {bid.smeReserved && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">政采预留</span>
                    )}
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-600" title="竞争指数 0-100，越低竞争越缓">
                      竞争 {bid.competitionIndex ?? 50}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      匹配度 {bid.matchScore}%
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {bid.category}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
