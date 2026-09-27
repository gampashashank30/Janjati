import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Admin screen accessed at /admin route
// Demo data — realistic in structure, not real government figures

const SCHEME_DATA = [
  { name: 'Pre-Matric', applications: 142800, sanctioned: 138500, amount: 20.75 },
  { name: 'Post-Matric', applications: 98400, sanctioned: 91200, amount: 39.34 },
  { name: 'Top Class', applications: 1240, sanctioned: 1180, amount: 33.04 },
  { name: 'NFST', applications: 830, sanctioned: 750, amount: 3.15 },
  { name: 'NOS', applications: 68, sanctioned: 20, amount: 1.20 },
];

const DISTRICT_DATA = [
  { district: 'Nandurbar', state: 'MH', students: 4821 },
  { district: 'Dhule', state: 'MH', students: 3642 },
  { district: 'Gadchiroli', state: 'MH', students: 5120 },
  { district: 'Bastar', state: 'CG', students: 6234 },
  { district: 'Nabarangpur', state: 'OD', students: 4500 },
  { district: 'West Siang', state: 'AR', students: 2100 },
];

const STATUS_PIE = [
  { name: 'Verified & Sanctioned', value: 231650, color: '#0F766E' },
  { name: 'Under Verification', value: 48200, color: '#F59E0B' },
  { name: 'Submitted', value: 22400, color: '#3b82f6' },
  { name: 'Draft', value: 8100, color: '#94a3b8' },
  { name: 'Rejected', value: 3290, color: '#dc2626' },
];

const TOTAL = {
  students: 313640,
  activeApplications: 243338,
  pendingVerification: 48200,
  totalDisbursed: 97.48, // crore
};

export function AdminScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="bg-[#0F766E] px-4 pt-10 pb-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/70 text-xs">Ministry of Tribal Affairs — Admin Portal</p>
          <h1 className="text-white font-bold text-xl mt-0.5">Tribal One Analytics</h1>
          <p className="text-white/60 text-xs mt-0.5">Financial Year 2025–26 &nbsp;|&nbsp; Demo Data</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-5 space-y-5">
        {/* KPI Cards */}
        <section className="grid grid-cols-2 gap-3" aria-label="Key metrics">
          <KPICard label="Total Registered Students" value={TOTAL.students.toLocaleString('en-IN')} sub="Across all 5 schemes" />
          <KPICard label="Active Applications" value={TOTAL.activeApplications.toLocaleString('en-IN')} sub="FY 2025–26" />
          <KPICard label="Pending Verification" value={TOTAL.pendingVerification.toLocaleString('en-IN')} sub="Awaiting district officer" color="text-[#F59E0B]" />
          <KPICard label="Total Disbursed (DBT)" value={`Rs. ${TOTAL.totalDisbursed} Cr`} sub="Via PFMS, FY 2025–26" color="text-green-600" />
        </section>

        {/* Scheme-wise Applications */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden" aria-label="Scheme-wise applications">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Scheme-wise Applications (FY 2025–26)</h2>
          </div>
          <div className="px-4 pt-2 pb-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={SCHEME_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  formatter={(v: any) => [Number(v ?? 0).toLocaleString('en-IN'), '']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="applications" name="Applications" fill="#0F766E" radius={[3, 3, 0, 0]} />
                <Bar dataKey="sanctioned" name="Sanctioned" fill="#F59E0B" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs" role="table" aria-label="Scheme details table">
              <thead className="bg-gray-50 border-y border-gray-100">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-600">Scheme</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-gray-600">Applied</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-gray-600">Sanctioned</th>
                  <th className="px-3 py-2.5 text-right font-semibold text-gray-600">Amount (Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SCHEME_DATA.map((s) => (
                  <tr key={s.name}>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{s.name}</td>
                    <td className="px-3 py-2.5 text-right text-gray-600">{s.applications.toLocaleString('en-IN')}</td>
                    <td className="px-3 py-2.5 text-right text-green-700 font-medium">{s.sanctioned.toLocaleString('en-IN')}</td>
                    <td className="px-3 py-2.5 text-right text-gray-700 font-medium">Rs. {s.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Status Distribution */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden" aria-label="Application status distribution">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Application Status Distribution</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center px-4 py-4 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={STATUS_PIE}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={40}
                >
                  {STATUS_PIE.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [Number(v ?? 0).toLocaleString('en-IN'), '']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* District Coverage */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden" aria-label="District coverage">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Top Districts by Student Count</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {DISTRICT_DATA.map((d, i) => (
              <div key={d.district} className="px-4 py-3 flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{d.district}</p>
                  <p className="text-xs text-gray-500">{d.state}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#0F766E]">{d.students.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-400">students</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Note:</span> All data displayed is demo/illustrative data for SIH 2026 prototype purposes. It does not represent actual Ministry of Tribal Affairs statistics.
          </p>
        </div>

        <a
          href="/"
          className="block w-full text-center py-3 text-sm font-medium text-[#0F766E] border border-[#0F766E] rounded-xl hover:bg-teal-50 transition-colors"
        >
          Back to Student Portal
        </a>
      </div>
    </div>
  );
}

function KPICard({ label, value, sub, color = 'text-[#0F766E]' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs font-medium text-gray-700 mt-1 leading-snug">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}
