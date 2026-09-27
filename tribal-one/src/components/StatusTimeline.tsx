import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import type { PaymentRecord } from '../types';
import { formatCurrency, formatDate } from '../utils/format';

const STAGES = [
  'Application Submitted',
  'Verification Completed',
  'Approved',
  'Sanctioned',
  'DBT Credited',
];

export function StatusTimeline({ payment }: { payment: PaymentRecord }) {
  const isCredited = payment.status === 'credited';
  const isFailed = payment.status === 'failed';
  const stageIndex = isCredited
    ? STAGES.length - 1
    : Math.max(STAGES.indexOf(payment.stage), 0);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#f8fafc' }}>
        <p className="text-sm font-bold text-gray-900">{payment.schemeName}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-500">
            Amount: <span className="font-semibold text-gray-800">{formatCurrency(payment.amount)}</span>
          </p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-md"
            style={{
              background: isCredited ? '#dcfce7' : isFailed ? '#fee2e2' : '#fef9c3',
              color: isCredited ? '#166534' : isFailed ? '#991b1b' : '#854d0e',
            }}
          >
            {payment.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 py-4">
        <ol className="relative space-y-0" aria-label="Payment progress">
          {STAGES.map((stage, i) => {
            const done = i <= stageIndex;
            const current = i === stageIndex;
            const failed = isFailed && current;

            return (
              <li key={stage} className="flex gap-3 pb-4 last:pb-0 relative">
                {/* Connector */}
                {i < STAGES.length - 1 && (
                  <div
                    className="absolute left-[11px] top-6 bottom-0 w-0.5"
                    style={{ background: done ? '#0F766E' : '#e5e9ef' }}
                    aria-hidden
                  />
                )}

                {/* Step icon */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {failed
                    ? <AlertCircle size={24} style={{ color: '#dc2626' }} />
                    : done
                      ? <CheckCircle size={24} style={{ color: '#0F766E' }} />
                      : current
                        ? <Clock size={24} style={{ color: '#F59E0B' }} />
                        : <Circle size={24} style={{ color: '#d1d5db' }} />}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p
                    className="text-sm leading-snug"
                    style={{
                      color: done ? '#111827' : '#9ca3af',
                      fontWeight: done ? 600 : 400,
                    }}
                  >
                    {stage}
                  </p>

                  {/* Payment details on final credited step */}
                  {i === STAGES.length - 1 && isCredited && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">
                        Date: <span className="font-semibold text-gray-800">{formatDate(payment.date)}</span>
                      </p>
                      {payment.utrNumber && (
                        <p className="text-xs text-gray-500">
                          UTR: <span className="font-mono font-semibold text-gray-800">{payment.utrNumber}</span>
                        </p>
                      )}
                      {payment.bankAccount && (
                        <p className="text-xs text-gray-500">
                          Account: <span className="font-mono font-semibold text-gray-800">{payment.bankAccount}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
