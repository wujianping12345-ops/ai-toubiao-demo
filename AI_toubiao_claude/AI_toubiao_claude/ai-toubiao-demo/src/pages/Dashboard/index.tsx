import { useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
  Cpu,
  Globe,
  ShieldCheck,
  Database,
  Layers,
  Code2,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';
import { statistics } from '../../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section - Tech/Cyberpunk Style - Updated to Lighter Blue */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-700 to-white text-white overflow-hidden pt-24 pb-48">
        {/* Background Grid & Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
          <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white drop-shadow-sm">
            以科技定义未来中标
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            融合 <span className="text-cyan-300 font-semibold">大语言模型</span> 与 <span className="text-indigo-300 font-semibold">行业知识图谱</span>，
            为企业打造全链路智能投标解决方案。从商机捕获到标书生成，让每一次竞标都胜算在握。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/info-collect')}
              className="group relative px-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <span className="flex items-center gap-2 relative z-10">
                立即启动引擎 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => navigate('/doc-generate')}
              className="px-8 py-4 bg-blue-800/50 border border-blue-400/30 hover:bg-blue-700/50 text-white rounded-lg font-bold text-lg transition-all backdrop-blur-sm flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-yellow-300" />
              体验极速生成
            </button>
          </div>

          {/* Core Metrics Overlay */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'AI模型参数', value: '100B+', icon: Cpu },
              { label: '行业知识库', value: '50TB', icon: Database },
              { label: '标书生成速度', value: '<30s', icon: Zap },
              { label: '平均中标率提升', value: '45%', icon: BarChart3 },
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition-colors">
                <stat.icon className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Positioning & Objectives - 4-Card Grid Style */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50 relative -mt-10 z-20 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">全维赋能 重新定义投标</h2>
            <p className="text-lg text-gray-600">从战略定位到执行目标，构建企业核心竞争力</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '全链条智能体',
                subtitle: '覆盖投标全生命周期的智能服务',
                desc: '依托人工智能技术，打造覆盖“信息获取-前置布局-方案定制-文件生成-复盘优化”的一站式服务体系。',
                icon: Target,
                color: 'text-blue-600',
                bg: 'bg-blue-500',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: '先发优势',
                subtitle: '突破传统痛点，重塑竞争格局',
                desc: '帮助企业突破传统投标痛点，提升中标率，成为建设工程投标领域的“先发优势型”解决方案提供者。',
                icon: Zap,
                color: 'text-orange-600',
                bg: 'bg-orange-500',
                gradient: 'from-orange-500 to-yellow-500'
              },
              {
                title: '效率革命',
                subtitle: '信息获取周期缩短50%+',
                desc: '实现目标项目前置信息的全网自动化抓取与分类，准确率达90%以上，大幅降低人工成本。',
                icon: Cpu,
                color: 'text-purple-600',
                bg: 'bg-purple-500',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: '前瞻布局',
                subtitle: '提前3-6个月完成策略布局',
                desc: '利用AI进行模糊测算，形成项目跟踪数据库，让企业在招标公告发布前具备明确行动方向。',
                icon: BarChart3,
                color: 'text-indigo-600',
                bg: 'bg-indigo-500',
                gradient: 'from-indigo-500 to-blue-600'
              },
              {
                title: '品质飞跃',
                subtitle: 'AI深度学习，输出高竞争力方案',
                desc: '通过AI对行业数据、成功案例的学习，输出更符合项目需求、更具竞争力的投标方案与文件。',
                icon: Sparkles,
                color: 'text-pink-600',
                bg: 'bg-pink-500',
                gradient: 'from-pink-500 to-rose-500'
              },
              {
                title: '智慧沉淀',
                subtitle: '构建企业专属“投标知识库”',
                desc: '基于复盘数据形成企业专属“投标知识库”，实现投标能力的持续优化与沉淀。',
                icon: Database,
                color: 'text-teal-600',
                bg: 'bg-teal-500',
                gradient: 'from-teal-500 to-emerald-500'
              }
            ].map((card, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between overflow-hidden relative group">
                {/* Decorative Background Blob */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="flex-1 relative z-10 pr-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className={`text-sm font-semibold mb-4 ${card.color}`}>{card.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>

                {/* Right Side 3D Visual */}
                <div className="w-32 h-32 relative flex-shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                   {/* Outer Rings */}
                   <div className={`absolute inset-0 border-2 border-dashed ${card.color} opacity-10 rounded-full animate-[spin_10s_linear_infinite]`}></div>
                   <div className={`absolute inset-2 border border-dotted ${card.color} opacity-20 rounded-full animate-[spin_15s_linear_infinite_reverse]`}></div>
                   
                   {/* Glass Card Base */}
                   <div className="absolute inset-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-white/50 backdrop-blur-sm transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                   
                   {/* Icon */}
                   <div className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-${card.bg}/30 group-hover:-translate-y-2 transition-transform duration-300`}>
                     <card.icon className="w-8 h-8 text-white" />
                   </div>
                   
                   {/* Floating Particles */}
                   <div className={`absolute top-0 right-0 w-2 h-2 rounded-full ${card.bg} animate-bounce delay-100`}></div>
                   <div className={`absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full ${card.bg} animate-pulse delay-300`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Architecture / Process Flow */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">全链路智能化作业流程</h2>
              <p className="text-lg text-gray-600">五大核心模块深度协同，构建闭环式投标生态</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {[
                  { 
                    title: '信息收集', 
                    desc: '全网商机实时捕获', 
                    icon: Search, 
                    color: 'bg-blue-500', 
                    path: '/info-collect' 
                  },
                  { 
                    title: '前置布局', 
                    desc: '政策与竞争分析', 
                    icon: Globe, 
                    color: 'bg-indigo-500', 
                    path: '/pre-layout' 
                  },
                  { 
                    title: '方案定制', 
                    desc: '最优策略智能匹配', 
                    icon: Layers, 
                    color: 'bg-purple-500', 
                    path: '/plan-custom' 
                  },
                  { 
                    title: '文件生成', 
                    desc: '标准标书一键直出', 
                    icon: FileText, 
                    color: 'bg-pink-500', 
                    path: '/doc-generate' 
                  },
                  { 
                    title: '投标复盘', 
                    desc: '数据驱动持续优化', 
                    icon: BarChart3, 
                    color: 'bg-orange-500', 
                    path: '/review' 
                  },
                ].map((step, index) => (
                  <div key={index} className="group relative">
                    <div 
                      onClick={() => navigate(step.path)}
                      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 h-full flex flex-col items-center text-center"
                    >
                      <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                        <step.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Module Breakdown */}
            <div className="mt-24 space-y-20">
              {[
                { 
                  title: '信息收集', 
                  subtitle: '智能商机捕获系统',
                  desc: '基于AI的全网招标信息监控与采集引擎。不再是被动等待，而是主动出击。系统24小时不间断扫描全网数千个招标平台，利用NLP技术精准识别与您业务匹配的商机，并实时推送提醒。',
                  features: ['覆盖3000+主流招标平台', '智能语义匹配，剔除无效信息', '实时微信/邮件消息推送', '历史招标数据回溯'],
                  icon: Search, 
                  color: 'text-blue-500', 
                  bg: 'bg-blue-50',
                  path: '/info-collect',
                  btnText: '开始搜寻商机'
                },
                { 
                  title: '前置布局', 
                  subtitle: '政策与竞争情报分析',
                  desc: '深度挖掘政策趋势与竞争对手动态。通过对海量政策文件的智能解读，为您提供最具价值的行业洞察。同时建立竞争对手画像，分析其历史中标数据与报价策略，助您知己知彼。',
                  features: ['宏观政策风向解读', '竞争对手报价策略分析', '行业中标率趋势预测', '潜在风险智能预警'],
                  icon: Globe, 
                  color: 'text-indigo-500', 
                  bg: 'bg-indigo-50',
                  path: '/pre-layout',
                  btnText: '查看情报分析'
                },
                { 
                  title: '方案定制', 
                  subtitle: 'AI智能策略与大纲生成',
                  desc: '结合项目需求与企业优势，一键生成最优投标策略。AI自动拆解招标文件，提取评分标准，为您推荐高分技术方案架构，并智能匹配企业过往类似优秀案例，大幅提升技术分。',
                  features: ['评分标准自动拆解', '高分标书大纲推荐', '企业优势智能匹配', '控标点精准识别'],
                  icon: Layers, 
                  color: 'text-purple-500', 
                  bg: 'bg-purple-50',
                  path: '/plan-custom',
                  btnText: '定制投标方案'
                },
                { 
                  title: '文件生成', 
                  subtitle: 'RAG增强自动写作引擎',
                  desc: '告别繁琐的文档编写工作。基于RAG检索增强生成技术，系统能够调用您的企业知识库，自动撰写技术方案、商务文件与资格证明。支持一键排版，生成符合格式要求的标准标书。',
                  features: ['技术方案自动撰写', '商务报表自动生成', '企业资质一键填充', '智能排版与校对'],
                  icon: FileText, 
                  color: 'text-pink-500', 
                  bg: 'bg-pink-50',
                  path: '/doc-generate',
                  btnText: '一键生成标书'
                },
                { 
                  title: '投标复盘', 
                  subtitle: '全维度数据复盘与优化',
                  desc: '让每一次投标都成为经验的积累。系统自动收集开标结果，多维度分析中标或失标原因。为您提供可视化的数据报表，持续优化投标策略，提升团队整体中标率。',
                  features: ['多维度胜负原因分析', '投标漏斗数据可视化', '团队绩效智能评估', '策略优化建议报告'],
                  icon: BarChart3, 
                  color: 'text-orange-500', 
                  bg: 'bg-orange-50',
                  path: '/review',
                  btnText: '查看复盘数据'
                },
              ].map((module, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 p-8 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100`}>
                  <div className="lg:w-1/2">
                    <div className={`inline-flex items-center justify-center p-3 rounded-xl ${module.bg} ${module.color} mb-6`}>
                      <module.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-lg font-medium text-primary-600 mb-4">{module.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed mb-8">{module.desc}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${module.color}`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => navigate(module.path)}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg ${module.color.replace('text-', 'bg-')} hover:opacity-90`}
                    >
                      {module.btnText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  
                  <div className="lg:w-1/2 w-full">
                    <div className={`aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100 ${module.bg} relative flex items-center justify-center group cursor-pointer`} onClick={() => navigate(module.path)}>
                      {/* Decorative Background Elements */}
                      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${module.color.replace('text-', 'from-')} to-transparent`}></div>
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${module.color.replace('text-', 'bg-')} opacity-10 blur-3xl rounded-full animate-pulse`}></div>
                      
                      {/* 3D-like Layered Visual */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Rotating Outer Ring */}
                        <div className={`absolute w-48 h-48 border-2 border-dashed ${module.color} opacity-20 rounded-full animate-[spin_10s_linear_infinite]`}></div>
                        <div className={`absolute w-56 h-56 border border-dotted ${module.color} opacity-10 rounded-full animate-[spin_15s_linear_infinite_reverse]`}></div>
                        
                        {/* Floating Tech Particles */}
                        <div className={`absolute top-1/4 left-1/4 w-2 h-2 ${module.color.replace('text-', 'bg-')} rounded-full animate-bounce`}></div>
                        <div className={`absolute bottom-1/4 right-1/3 w-3 h-3 ${module.color.replace('text-', 'bg-')} rounded-full animate-pulse opacity-50`}></div>
                        <div className={`absolute top-1/3 right-1/4 w-1.5 h-1.5 ${module.color.replace('text-', 'bg-')} rounded-full animate-ping`}></div>

                        {/* Main Visual Core */}
                        <div className="relative">
                          {/* Glass Effect Card behind icon */}
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-2xl -rotate-6 scale-110 border border-white/50 shadow-inner"></div>
                          
                          {/* The Icon with depth */}
                          <div className={`relative z-10 p-6 rounded-2xl bg-white shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            <module.icon className={`w-16 h-16 ${module.color} drop-shadow-lg`} />
                            
                            {/* Accent line */}
                            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 ${module.color.replace('text-', 'bg-')} rounded-full opacity-50`}></div>
                          </div>

                          {/* Secondary smaller icon floating nearby */}
                          <div className="absolute -top-6 -right-6 p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-white z-20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
                             {module.title === '信息收集' && <Database className="w-5 h-5 text-blue-400" />}
                             {module.title === '前置布局' && <ShieldCheck className="w-5 h-5 text-indigo-400" />}
                             {module.title === '方案定制' && <Cpu className="w-5 h-5 text-purple-400" />}
                             {module.title === '文件生成' && <CheckCircle2 className="w-5 h-5 text-pink-400" />}
                             {module.title === '投标复盘' && <TrendingUp className="w-5 h-5 text-orange-400" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Feature Deep Dive - Alternating Layout */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <Cpu className="w-4 h-4 mr-2" />
                智能核心
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">NLP 自然语言处理引擎</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                区别于传统的关键词匹配，我们的 AI 能够真正"读懂"招标文件。通过深度语义分析，
                精准提取关键评分项、隐性需求和废标风险点，确保您的响应万无一失。
              </p>
              <ul className="space-y-4">
                {[
                  '基于 Transformer 架构的行业专用模型',
                  '支持多格式文档解析 (PDF, Word, Excel, 图片)',
                  '毫秒级语义检索与匹配'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-3"></div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 relative z-10">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-gray-400 ml-auto">AI Analysis Running...</div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                    <span className="text-blue-600 font-bold">[Input]</span> 招标文件技术需求.pdf
                  </div>
                  <div className="flex gap-2">
                    <div className="w-0.5 bg-gray-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="p-2 bg-green-50 text-green-700 rounded">
                        Analyzing semantic requirements...
                      </div>
                      <div className="p-2 bg-purple-50 text-purple-700 rounded">
                        Extracting key entities: "智慧城市", "微服务", "国产化"
                      </div>
                      <div className="p-2 bg-orange-50 text-orange-700 rounded">
                        Detected Risk: "需提供CMMI5级证书" (Missing in profile)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Code2 className="w-4 h-4 mr-2" />
                生成式 AI
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">RAG 增强标书生成</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                利用检索增强生成 (RAG) 技术，将您的企业私有知识库（过往优质标书、产品手册、资质文件）
                与大模型能力结合，生成既符合规范又具备企业特色的高质量内容。
              </p>
              <ul className="space-y-4">
                {[
                  '知识库自动切片与向量化存储',
                  '上下文感知的智能续写与润色',
                  '一键排版，自动生成目录与页码'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 transform -rotate-3"></div>
               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative z-10">
                 <img 
                   src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop" 
                   alt="Document Generation" 
                   className="w-full h-64 object-cover opacity-90"
                 />
                 <div className="p-6 bg-white absolute bottom-0 left-0 right-0 border-t border-gray-100 backdrop-blur-md bg-white/90">
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-bold text-gray-800">技术方案.docx</span>
                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">生成完成 100%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-1.5">
                     <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">企业级安全保障</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '私有化部署',
                desc: '支持本地服务器部署，数据不出内网，彻底杜绝泄露风险。',
                icon: ShieldCheck
              },
              {
                title: '数据加密传输',
                desc: '全链路采用 SSL/TLS 加密，敏感数据 AES-256 存储。',
                icon: Database
              },
              {
                title: '细粒度权限控制',
                desc: '基于角色的访问控制 (RBAC)，精确管理每个成员的操作权限。',
                icon: Layers
              }
            ].map((item, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to Blue */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center bg-fixed mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-4xl font-bold text-white mb-6">准备好赢得更多项目了吗？</h2>
          <p className="text-xl text-blue-100 mb-10">
            加入数千家行业领先企业，开启智能化投标新时代。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
               onClick={() => navigate('/info-collect')}
               className="px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-white/20 transition-all"
             >
               免费试用系统
             </button>
             <button className="px-10 py-4 border border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-lg backdrop-blur-sm transition-all">
               预约产品演示
             </button>
          </div>
        </div>
      </section>
      
      {/* Footer Stats Strip (Simulating Market Pulse) - Updated to Light Blue */}
      <div className="bg-blue-50 border-t border-blue-100 py-4 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-blue-600 text-sm font-medium">
           <span>⚡ 今日新增招标信息: {statistics.newBidsToday} 条</span>
           <span>⚡ 平台累计服务金额: {statistics.totalAmount}</span>
           <span>⚡ 平均中标率: {statistics.winRate}%</span>
           <span>⚡ 系统运行稳定: 99.99%</span>
           {/* Duplicate for infinite scroll effect */}
           <span>⚡ 今日新增招标信息: {statistics.newBidsToday} 条</span>
           <span>⚡ 平台累计服务金额: {statistics.totalAmount}</span>
           <span>⚡ 平均中标率: {statistics.winRate}%</span>
           <span>⚡ 系统运行稳定: 99.99%</span>
        </div>
      </div>
    </div>
  );
}