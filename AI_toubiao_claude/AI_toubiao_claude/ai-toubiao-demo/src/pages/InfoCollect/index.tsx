import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Banknote,
  X,
  Clock,
  CheckCircle2,
  Sparkles,
  CheckSquare,
  FileText,
  Briefcase,
  Award,
  Zap,
  ArrowRight,
  Users,
  ShieldCheck,
  DollarSign,
  Heart,
  HardHat,
  Trophy,
  History,
  ChevronRight,
  Globe,
  Plus,
  Upload,
  ScanLine,
  Loader2,
  FileCheck,
} from 'lucide-react';
import { bidInfoList, type BidInfo } from '../../data/mockData';

// 企业资料上传类型（选传，AI 智能解析与信息提取）
const UPLOAD_CATEGORIES = [
  { id: 'license', label: '企业营业执照', desc: '支持 PDF、图片，用于提取企业名称、统一社会信用代码等' },
  { id: 'qualification', label: '资质等级相关文件', desc: '资质证书、等级证明等，用于完善资质与能力维度' },
  { id: 'performance', label: '近 3-5 年核心业绩相关文件', desc: '合同、中标通知书、业绩证明等，用于历史业绩与荣誉' },
  { id: 'entity', label: '主体证明文件（含企业全称 + 统一社会信用代码）', desc: '用于核验主体信息，支撑企业画像准确性' },
] as const;

// Simulated matching reasons
const matchReasons = {
  'BID-2026-001': ['资质完全匹配 (系统集成一级)', '核心业务高度相关', '预算范围符合预期'],
  'BID-2026-002': ['区域优先 (上海)', '过往案例相似度 85%'],
  'BID-2026-005': ['产品线匹配', '具备所需医疗器械许可'],
};

export default function InfoCollect() {
  const navigate = useNavigate();
  
  // Detailed Profile State
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBid, setSelectedBid] = useState<BidInfo | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<Record<string, { file: File | null; parsing: boolean; parsed: boolean }>>({
    license: { file: null, parsing: false, parsed: false },
    qualification: { file: null, parsing: false, parsed: false },
    performance: { file: null, parsing: false, parsed: false },
    entity: { file: null, parsing: false, parsed: false },
  });
  const [isParsingAll, setIsParsingAll] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSmartUpload = () => {
    setIsAutoFilling(true);
    setTimeout(() => {
      setIsAutoFilling(false);
      alert("AI 已成功从文档中提取 12 项关键信息并自动填充！");
    }, 2500);
  };

  const handleFileChange = (id: string, file: File | null) => {
    setUploadFiles((prev) => ({
      ...prev,
      [id]: { ...prev[id], file, parsed: false },
    }));
  };

  const handleStartParse = () => {
    const hasAny = UPLOAD_CATEGORIES.some((c) => uploadFiles[c.id].file);
    if (!hasAny) {
      alert('请先上传至少一份企业资料后再进行智能解析。');
      return;
    }
    setIsParsingAll(true);
    UPLOAD_CATEGORIES.forEach((c) => {
      if (uploadFiles[c.id].file) {
        setUploadFiles((prev) => ({ ...prev, [c.id]: { ...prev[c.id], parsing: true } }));
      }
    });
    setTimeout(() => {
      setUploadFiles((prev) => {
        const next = { ...prev };
        UPLOAD_CATEGORIES.forEach((c) => {
          if (next[c.id].file) next[c.id] = { ...next[c.id], parsing: false, parsed: true };
        });
        return next;
      });
      setIsParsingAll(false);
      alert('AI 已完成对已上传文件的智能解析与信息提取，企业画像已更新。');
    }, 2800);
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => ({ ...prev, [id]: { file: null, parsing: false, parsed: false } }));
  };

  const filteredBids = bidInfoList.filter(bid => 
    bid.title.includes(searchKeyword) || bid.region.includes(searchKeyword)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">信息收集与智能匹配</h1>
          <p className="text-gray-500 mt-2 text-lg">
            通过高精度的企业数字画像，实现商机与能力的深度契合。
          </p>
        </div>
        <div className="flex gap-3">
           <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-bold text-sm">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
             全网实时监控中
           </div>
        </div>
      </div>

      {/* Advanced Company DNA Dashboard - Scrolling View */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 lg:p-12 relative overflow-hidden">
        {/* Floating Toolbar: Auto-Upload & Completeness */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">企业画像 DNA</h2>
              <p className="text-base font-bold text-gray-400">全维度数据中心</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
             {/* Smart Upload Button */}
             <button 
               onClick={handleSmartUpload}
               disabled={isAutoFilling}
               className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 h-16 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-indigo-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isAutoFilling ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin" />
                   AI 正在解析文档...
                 </>
               ) : (
                 <>
                   <ScanLine className="w-6 h-6" />
                   上传资料自动提取
                 </>
               )}
             </button>

             <div className="w-full sm:w-auto flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-2 pr-8 shadow-sm h-16">
               <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                   <circle cx="24" cy="24" r="20" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="18.84" strokeLinecap="round" />
                 </svg>
                 <span className="absolute text-xs font-black text-blue-700">85%</span>
               </div>
               <div className="flex flex-col justify-center">
                 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-none mb-1">画像完整度</p>
                 <p className="text-base font-black text-gray-900 leading-none">良好</p>
               </div>
             </div>
          </div>
        </div>

        {/* 企业资料上传（选传）- 用于企业用户画像与优劣势分析 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Upload className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-800">企业资料上传（选传）</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                上传以下文件，AI 将进行智能解析与信息提取，用于构建企业用户画像并开展优劣势分析。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {UPLOAD_CATEGORIES.map((cat) => {
              const state = uploadFiles[cat.id];
              return (
                <div
                  key={cat.id}
                  className="border border-gray-200 rounded-2xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{cat.label}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                    </div>
                    {state.parsed && (
                      <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        <FileCheck className="w-3.5 h-3.5" /> 已解析
                      </span>
                    )}
                    {state.parsing && (
                      <span className="shrink-0 flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> 解析中
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="file"
                      id={`upload-${cat.id}`}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(cat.id, e.target.files?.[0] ?? null)}
                    />
                    <label
                      htmlFor={`upload-${cat.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {state.file ? state.file.name : '选择文件'}
                    </label>
                    {state.file && !state.parsing && (
                      <button
                        type="button"
                        onClick={() => removeFile(cat.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="移除"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleStartParse}
              disabled={isParsingAll || !UPLOAD_CATEGORIES.some((c) => uploadFiles[c.id].file)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isParsingAll ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI 正在解析与提取...
                </>
              ) : (
                <>
                  <ScanLine className="w-5 h-5" />
                  开始智能解析与提取
                </>
              )}
            </button>
            <span className="text-xs text-gray-500">
              支持 PDF、Word、图片等格式；解析结果将自动写入下方企业画像维度。
            </span>
          </div>
        </section>

        {/* 合规与信用核验 */}
        <section className="mb-16 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
          <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-600" />
            合规与信用核验
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              type="button"
              className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <Search className="w-4 h-4 text-slate-500" />
              合作方/主体信用核验（一键核查违规历史）
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-amber-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              合规预警：建筑业企业资质「电子与智能化工程专业承包一级」将于 2026-06 到期，请提前准备延续材料。
            </p>
            <p className="font-medium text-amber-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              合规预警：某历史项目存在分包备案未及时更新风险，建议在投标前完成合规自查。
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-16">
          
          {/* Section 1: 资质与能力 */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">资质与能力维度</h3>
              <button className="ml-auto text-sm font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                <Plus className="w-4 h-4" /> 管理资质
              </button>
            </div>
            {/* Vertical Stack Layout */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">建筑业企业资质</label>
                <div className="flex flex-wrap gap-3">
                  {['建筑工程施工总承包一级', '市政公用工程总承包一级', '电子与智能化工程专业承包一级'].map(t => (
                    <span key={t} className="px-4 py-3 bg-gray-50 text-gray-700 text-sm font-bold rounded-xl border border-gray-200 flex items-center gap-2 hover:bg-white hover:shadow-sm transition-all cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">体系认证 (ISO)</label>
                <div className="flex flex-wrap gap-3">
                  {['ISO9001 质量管理体系', 'ISO14001 环境管理体系', 'ISO45001 职业健康安全'].map(iso => (
                    <div key={iso} className="px-4 py-3 border border-green-100 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 text-sm font-bold hover:shadow-sm transition-all">
                      <CheckCircle2 className="w-4 h-4" /> {iso}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">安全生产许可证</label>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4 w-full md:w-fit">
                   <ShieldCheck className="w-6 h-6 text-blue-600" />
                   <div className="flex flex-col">
                     <span className="text-xs font-bold text-blue-400 uppercase">状态: 有效</span>
                     <span className="text-base font-black text-blue-800">有效期至: 2028-12-31</span>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 业务与地域 */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">业务范围与市场地域</h3>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">擅长工程类型</label>
                <div className="flex flex-wrap gap-3">
                  {['房建工程', '市政工程', '公路工程', '水利水电', '电力工程', '通信工程'].map(type => (
                    <span key={type} className="px-5 py-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition-colors cursor-pointer">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">业务覆盖区域</label>
                <div className="flex flex-wrap gap-3 items-center">
                  {['浙江省', '上海市', '江苏省'].map(p => (
                    <span key={p} className="px-5 py-3 bg-white rounded-xl border border-gray-200 text-gray-700 text-sm font-bold shadow-sm">
                      {p}
                    </span>
                  ))}
                  <span className="px-5 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100">
                    <CheckCircle2 className="w-4 h-4" /> 接受异地施工
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 技术与人员 */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-orange-100 rounded-lg">
                <HardHat className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">技术与人员配置</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: '注册建造师', value: '45', unit: '人', detail: '一级: 12 人 | 二级: 33 人', icon: HardHat, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: '中高级工程师', value: '128', unit: '人', detail: '涵盖建筑、机电、造价专业', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: '主要施工设备', value: '320', unit: '台', detail: '塔吊、挖掘机、BIM系统等', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">{item.label}</p>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl font-black text-gray-900">{item.value}</span>
                      <span className="text-sm font-bold text-gray-500">{item.unit}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: 财务与规模 */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">财务与规模维度</h3>
            </div>
            <div className="space-y-6">
               <div className="p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] text-white shadow-xl shadow-emerald-100">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                   <div>
                     <p className="text-sm font-bold uppercase opacity-80 mb-2">近 3 年平均年营业额</p>
                     <p className="text-5xl font-black">¥ 4.85 <span className="text-2xl font-bold">亿</span></p>
                   </div>
                   <div className="flex items-end gap-2 h-16">
                     <div className="flex flex-col justify-end gap-1">
                        <span className="text-[10px] font-bold opacity-80">2023</span>
                        <div className="w-8 bg-white/30 rounded-t-md h-8"></div>
                     </div>
                     <div className="flex flex-col justify-end gap-1">
                        <span className="text-[10px] font-bold opacity-80">2024</span>
                        <div className="w-8 bg-white/50 rounded-t-md h-12"></div>
                     </div>
                     <div className="flex flex-col justify-end gap-1">
                        <span className="text-[10px] font-bold opacity-80">2025</span>
                        <div className="w-8 bg-white rounded-t-md h-16 shadow-lg"></div>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs font-black text-gray-400 uppercase mb-2">注册资本</p>
                    <p className="text-3xl font-black text-gray-800">5,000 <span className="text-base text-gray-500">万</span></p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs font-black text-gray-400 uppercase mb-2">公司净资产</p>
                    <p className="text-3xl font-black text-gray-800">1.2 <span className="text-base text-gray-500">亿</span></p>
                  </div>
               </div>
            </div>
          </section>

          {/* Section 5: 项目偏好 */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800">项目偏好与市场选择</h3>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">偏好发包方类型</label>
                <div className="flex flex-wrap gap-3">
                  {['政府机关', '国有企业', '私营企业'].map(t => (
                    <span key={t} className="px-5 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">排除条件 (Negative List)</label>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-sm font-bold text-gray-600 leading-relaxed">
                  • 垫资比例超过 30% 的项目<br/>
                  • 工期要求少于 100 天的房建项目<br/>
                  • 信用评级低于 B 级的发包方
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: 历史业绩 */}
          <section className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <History className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800">历史业绩与荣誉</h3>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-green-100">
                <ShieldCheck className="w-4 h-4" /> 黑名单自查: 正常
              </span>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">代表性项目案例</label>
                <div className="space-y-4">
                  {[
                    { name: '杭州萧山国际机场改扩建项目', type: '房建/机电', amount: '1.2亿' },
                    { name: '上海浦东政务云二期工程', type: '信息化/集成', amount: '8,500万' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group">
                      <div>
                        <p className="text-base font-black text-gray-800 group-hover:text-purple-700 transition-colors">{item.name}</p>
                        <div className="flex gap-3 mt-2">
                           <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold">{item.type}</span>
                           <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold">合同额: {item.amount}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500" />
                    </div>
                  ))}
                  <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" /> 上传更多业绩证明文件
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">获奖情况</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: '2025年度国家优质工程奖 (鲁班奖)', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-100' },
                    { name: '浙江省科学技术进步一等奖', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${item.border} ${item.bg} shadow-sm`}>
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Trophy className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <span className={`text-sm font-black ${item.color}`}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Results Section（智能匹配控制已迁移至商机寻找页面） */}
      <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              为您精选匹配 <span className="text-gray-400 text-lg font-normal">(Top 5)</span>
            </h2>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="搜索已匹配的项目..." 
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-72 transition-all bg-white shadow-sm"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-6">
            {filteredBids.map((bid) => {
              const reasons = matchReasons[bid.id as keyof typeof matchReasons] || ['综合评分高', '行业属性匹配'];
              const isSelected = selectedIds.includes(bid.id);
              
              return (
                <div 
                  key={bid.id}
                  onClick={() => setSelectedBid(bid)}
                  className={`group relative bg-white p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                    isSelected ? 'border-blue-500 ring-8 ring-blue-50 shadow-2xl' : 'border-gray-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1'
                  }`}
                >
                  <div className="absolute top-10 left-6" onClick={(e) => { e.stopPropagation(); toggleSelect(bid.id); }}>
                    {isSelected ? 
                      <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 animate-in zoom-in-50"><CheckSquare className="w-4 h-4 text-white" /></div> 
                      : 
                      <div className="w-6 h-6 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors"></div>
                    }
                  </div>

                  <div className="pl-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 flex-wrap">
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">{bid.title}</h3>
                          {bid.smeReserved && (
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">政采预留</span>
                          )}
                          {bid.matchScore >= 90 && (
                            <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5 shadow-lg shadow-orange-200">
                              <Zap className="w-3 h-3 fill-current" />
                              Strong Match
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-xs font-black text-gray-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {bid.region}</span>
                          <span className="flex items-center gap-1.5"><Banknote className="w-4 h-4" /> {bid.budget}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> DDL: {bid.deadline}</span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-4xl font-black text-blue-600 tracking-tighter">{bid.matchScore}</span>
                          <span className="text-xs font-black text-gray-300">POINTS</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase mt-1 tracking-widest">Match Engine Score</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-all duration-500">
                      <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">匹配分析:</span>
                        {reasons.map((reason, rIdx) => (
                          <span key={rIdx} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-600 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors shadow-sm">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Action Bar */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 flex gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 hover:text-gray-900 shadow-xl shadow-gray-200/50 transition-all">
                      Details
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-200 flex items-center gap-2 transition-all hover:scale-105" onClick={(e) => { e.stopPropagation(); navigate('/doc-generate'); }}>
                      Generate Bid <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Detailed Modal (Remains basically same but with updated styling) */}
      {selectedBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedBid(null)}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-10 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">{selectedBid.title}</h2>
              <button onClick={() => setSelectedBid(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-8 h-8 text-gray-400" /></button>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">项目预算</div>
                  <div className="text-2xl font-black text-gray-900">{selectedBid.budget}</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">项目来源</div>
                  <div className="text-xl font-bold text-gray-900 truncate" title={selectedBid.source}>{selectedBid.source}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-widest text-sm">
                  <FileText className="w-5 h-5 text-blue-500" />
                  项目概况深度解析
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 text-sm font-medium italic">
                  “{selectedBid.description}”
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-gray-900 flex items-center gap-2 uppercase tracking-widest text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  核心资质匹配清单
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedBid.requirements.map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <span className="text-sm font-bold text-gray-700">{req}</span>
                      <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase rounded-lg shadow-md shadow-green-200">Matched</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
                <button onClick={() => setSelectedBid(null)} className="px-8 py-4 border-2 border-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all">
                  Close
                </button>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-xl shadow-blue-200 flex items-center gap-2 transition-all hover:scale-105" onClick={() => navigate('/doc-generate')}>
                  <Zap className="w-4 h-4" />
                  Initiate Generator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}