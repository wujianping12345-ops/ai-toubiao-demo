import { useState } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  Loader2,
  FileCheck,
  Sparkles,
  History,
  FileType,
  Edit3,
  Copy,
  Printer,
  Clock,
  File,
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { bidInfoList, docTemplates, sampleGeneratedDoc } from '../../data/mockData';

type GenerateStatus = 'idle' | 'selecting' | 'generating' | 'completed';

// 历史记录数据
const generateHistory = [
  { id: 1, project: '杭州市萧山区智慧城市管理平台', date: '2026-01-22 15:30', status: 'completed' },
  { id: 2, project: '上海市浦东新区政务服务中心装修', date: '2026-01-20 10:15', status: 'completed' },
  { id: 3, project: '广州市天河区教育局信息化设备', date: '2026-01-18 14:20', status: 'completed' },
];

// 预评分数据
const scoreData = {
  total: 92.5,
  dimensions: [
    { name: '技术方案', score: 43.5, max: 45, color: 'bg-blue-500', note: '施工组织设计详实，工艺先进' },
    { name: '商务报价', score: 32.0, max: 35, color: 'bg-green-500', note: '报价在合理低价区间，偏离度低' },
    { name: '资信业绩', score: 13.5, max: 15, color: 'bg-purple-500', note: '企业资质与相似业绩匹配度高' },
    { name: '人员配置', score: 2.5, max: 3, color: 'bg-orange-500', note: '项目经理履历优秀' },
    { name: '设备资源', score: 1.8, max: 2, color: 'bg-yellow-500', note: '主要设备满足要求' },
  ],
  details: [
    { category: '响应性', status: 'pass', desc: '无负偏离或重大偏离，技术规格完全满足。' },
    { category: '创新性', status: 'bonus', desc: '提出了BIM技术应用与数字化交付方案，预计加 1-2 分。' },
    { category: '文件质量', status: 'good', desc: '排版规范，目录清晰，逻辑性强。' }
  ]
};

export default function DocGenerate() {
  const [status, setStatus] = useState<GenerateStatus>('idle');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(true);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleGenerate = () => {
    if (!selectedProject || !selectedTemplate) return;

    setStatus('generating');
    setGeneratingProgress(0);

    // 模拟生成过程
    const interval = setInterval(() => {
      setGeneratingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedProject('');
    setSelectedTemplate('');
    setGeneratingProgress(0);
    setExpandedSection(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">文件生成系统</h1>
        <p className="text-gray-500 mt-1">
          AI智能生成标准投标文件，自动填充项目信息
        </p>
      </div>

      <div className="flex gap-6 items-start">
        {/* 左侧配置区 - Sticky */}
        <div className="w-[360px] flex flex-col gap-4 sticky top-24">
          {/* 选择项目 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              选择投标项目
            </h3>
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                disabled={status !== 'idle'}
                className="w-full appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">请选择项目...</option>
                {bidInfoList.map((bid) => (
                  <option key={bid.id} value={bid.id}>
                    {bid.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* 选择模板 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              选择文件模板
            </h3>
            <div className="space-y-2">
              {docTemplates.map((template) => (
                <label
                  key={template.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  } ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    disabled={status !== 'idle'}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-800">
                      {template.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      包含 {template.sections.length} 个章节
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 生成按钮 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm">
                3
              </span>
              生成文件
            </h3>

            {status === 'generating' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">正在生成中...</span>
                  <span className="text-primary-600">{generatingProgress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${generatingProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {generatingProgress < 30 && 'AI正在分析项目需求...'}
                  {generatingProgress >= 30 && generatingProgress < 60 && 'AI正在生成技术方案...'}
                  {generatingProgress >= 60 && generatingProgress < 90 && 'AI正在编写商务报价...'}
                  {generatingProgress >= 90 && 'AI正在校验文档格式...'}
                </div>
              </div>
            )}

            {status === 'completed' && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">投标文件生成完成!</span>
              </div>
            )}

            <div className="flex gap-2">
              {status === 'idle' && (
                <button
                  onClick={handleGenerate}
                  disabled={!selectedProject || !selectedTemplate}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  AI一键生成
                </button>
              )}

              {status === 'generating' && (
                <button
                  disabled
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-lg opacity-75"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  生成中...
                </button>
              )}

              {status === 'completed' && (
                <div className="space-y-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowExportOptions(!showExportOptions)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      导出文件
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showExportOptions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
                          <FileType className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-800">Word文档 (.docx)</div>
                            <div className="text-xs text-gray-500">适合编辑修改</div>
                          </div>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-t border-gray-100">
                          <File className="w-4 h-4 text-red-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-800">PDF文档 (.pdf)</div>
                            <div className="text-xs text-gray-500">适合打印提交</div>
                          </div>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-t border-gray-100">
                          <Printer className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-800">直接打印</div>
                            <div className="text-xs text-gray-500">打印预览</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Edit3 className="w-4 h-4" />
                      在线编辑
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Copy className="w-4 h-4" />
                      复制内容
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 历史记录 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <h4 className="font-medium text-gray-800 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-400" />
                生成历史
              </h4>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
            </button>
            {showHistory && (
              <div className="px-4 pb-4 space-y-2">
                {generateHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-800 truncate">{item.project}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已完成
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 功能说明 */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary-600" />
              AI智能生成能力
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                自动识别招标文件格式要求
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                智能填充企业资质信息
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                根据项目特点生成技术方案
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></span>
                自动校验格式规范，减少90%错误
              </li>
            </ul>
          </div>
        </div>

        {/* 右侧预览区 - 自然流动 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-400" />
              文件预览
            </h3>
            {status === 'completed' && (
              <span className="text-sm text-gray-500">
                共 {sampleGeneratedDoc.sections.length} 个章节
              </span>
            )}
          </div>

          <div className="flex-1">
            {status === 'idle' && (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>请选择项目和模板后生成文件</p>
                </div>
              </div>
            )}

            {status === 'generating' && (
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary-600 animate-spin" />
                  <p className="text-gray-600">AI正在为您生成投标文件...</p>
                  <p className="text-sm text-gray-400 mt-2">预计需要30秒</p>
                </div>
              </div>
            )}

            {status === 'completed' && (
              <div className="flex flex-col h-full">
                {/* 预评分卡片 - 新增 */}
                <div className="m-6 mb-0 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 relative overflow-hidden">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        投标文件 AI 预评分
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">基于最新招标文件评分标准的模拟打分</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-blue-600">{scoreData.total} <span className="text-lg text-gray-400 font-medium">/ 100</span></div>
                      <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1 inline-block">竞争力极强</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-10 relative z-10">
                    {/* Scoring Bars Section */}
                    <div className="space-y-6">
                      {scoreData.dimensions.map((dim, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-bold text-gray-700 text-base">{dim.name}</span>
                            <span className="font-bold text-gray-900 text-base">{dim.score} <span className="text-gray-400 font-medium">/ {dim.max}</span></span>
                          </div>
                          <div className="h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full ${dim.color} rounded-full shadow-sm`} style={{ width: `${(dim.score / dim.max) * 100}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1.5 font-medium">{dim.note}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlights & Suggestions Section - Now full width below */}
                    <div className="bg-white/60 rounded-[2rem] p-6 border border-white/50 backdrop-blur-sm shadow-sm">
                      <h4 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        AI 亮点深度分析与改进建议
                      </h4>
                      <div className="space-y-4">
                        {scoreData.details.map((detail, i) => (
                          <div key={i} className="flex gap-3 text-sm bg-white/40 p-3.5 rounded-xl border border-white/20 hover:bg-white/60 transition-colors">
                            {detail.status === 'pass' && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                            {detail.status === 'bonus' && <TrendingUp className="w-5 h-5 text-orange-500 shrink-0" />}
                            {detail.status === 'good' && <FileCheck className="w-5 h-5 text-blue-500 shrink-0" />}
                            <div>
                              <span className="font-bold text-gray-800 mr-2">[{detail.category}]</span>
                              <span className="text-gray-600 font-medium">{detail.desc}</span>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-3 text-sm pt-5 border-t border-gray-200/50 mt-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                          <span className="text-gray-500 italic font-medium leading-relaxed">
                            <span className="font-bold text-gray-700 not-italic mr-2">专家建议：</span>
                            当前人员配置评分已达 83%，如能补充项目经理近五年的两个以上同规模项目奖项证书，该项评分有望提升至 100% 满分。
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* 文件标题 */}
                  <div className="text-center mb-8 pb-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                      投标文件
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {sampleGeneratedDoc.projectName}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      AI智能生成
                    </div>
                  </div>

                  {/* 章节目录和内容 */}
                  <div className="space-y-4">
                    {sampleGeneratedDoc.sections.map((section, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedSection(
                              expandedSection === index ? null : index
                            )
                          }
                          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-800">
                            {section.title}
                          </span>
                          {expandedSection === index ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        {expandedSection === index && (
                          <div className="p-4 bg-white">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                              {section.content}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}