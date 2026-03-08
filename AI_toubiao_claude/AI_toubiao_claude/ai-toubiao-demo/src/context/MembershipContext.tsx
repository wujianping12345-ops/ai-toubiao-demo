import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond';

const STORAGE_KEY_TIER = 'ai_toubiao_membership_tier';
const STORAGE_KEY_GENERATE = 'ai_toubiao_generate_usage';

const SILVER_MONTHLY_LIMIT = 3;

function getMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getStoredUsage(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GENERATE);
    if (!raw) return 0;
    const data = JSON.parse(raw) as { month: string; count: number };
    return data.month === getMonthKey() ? data.count : 0;
  } catch {
    return 0;
  }
}

function saveUsage(count: number) {
  try {
    localStorage.setItem(STORAGE_KEY_GENERATE, JSON.stringify({ month: getMonthKey(), count }));
  } catch {}
}

interface MembershipContextValue {
  tier: MembershipTier;
  setTier: (t: MembershipTier) => void;
  /** 商机展示条数上限 */
  opportunityLimit: number;
  /** 是否支持更多筛选项（项目金额、智能匹配控制） */
  hasAdvancedFilters: boolean;
  /** 招标/投标文件生成是否可用（未禁用） */
  canUseDocGenerate: boolean;
  /** 本月已使用生成次数（仅银卡有意义） */
  monthlyGenerateUsed: number;
  /** 本月生成次数上限（银卡为 3，其余为 Infinity） */
  monthlyGenerateLimit: number;
  /** 是否可执行一次生成（未超限且未禁用） */
  canUseGenerate: boolean;
  /** 执行一次生成（银卡时增加计数） */
  useGenerate: () => void;
  /** 是否有短信推送服务（仅钻石卡） */
  hasSmsPush: boolean;
}

const MembershipContext = createContext<MembershipContextValue | null>(null);

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<MembershipTier>(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEY_TIER) as MembershipTier | null;
      if (t === 'free' || t === 'silver' || t === 'gold' || t === 'diamond') return t;
    } catch {}
    return 'free';
  });
  const [monthlyUsed, setMonthlyUsed] = useState(getStoredUsage);

  useEffect(() => {
    setMonthlyUsed(getStoredUsage());
  }, [tier]);

  const setTier = useCallback((t: MembershipTier) => {
    setTierState(t);
    try {
      localStorage.setItem(STORAGE_KEY_TIER, t);
    } catch {}
  }, []);

  const opportunityLimit = tier === 'free' ? 5 : 30;
  const hasAdvancedFilters = tier === 'gold' || tier === 'diamond';
  const canUseDocGenerate = tier !== 'free';
  const monthlyGenerateLimit = tier === 'silver' ? SILVER_MONTHLY_LIMIT : Infinity;
  const monthlyGenerateUsed = tier === 'silver' ? monthlyUsed : 0;
  const canUseGenerate = canUseDocGenerate && monthlyGenerateUsed < monthlyGenerateLimit;
  const hasSmsPush = tier === 'diamond';

  const useGenerate = useCallback(() => {
    if (tier !== 'silver') return;
    const next = getStoredUsage() + 1;
    setMonthlyUsed(next);
    saveUsage(next);
  }, [tier]);

  const value: MembershipContextValue = {
    tier,
    setTier,
    opportunityLimit,
    hasAdvancedFilters,
    canUseDocGenerate,
    monthlyGenerateUsed,
    monthlyGenerateLimit,
    canUseGenerate,
    useGenerate,
    hasSmsPush,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership(): MembershipContextValue {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error('useMembership must be used within MembershipProvider');
  return ctx;
}

export const TIER_LABELS: Record<MembershipTier, string> = {
  free: '免费体验版',
  silver: '基础会员（银卡）',
  gold: '高级会员（金卡）',
  diamond: '尊享会员（钻石卡）',
};
