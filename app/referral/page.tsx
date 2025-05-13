'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentModal from '@/components/PaymentModal';

export default function ReferralPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [planTitle, setPlanTitle] = useState('');
  const [referrer, setReferrer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const referrerId = params.get('id');

  useEffect(() => {
    const fetchReferrer = async () => {
      try {
        const response = await fetch(`/api/referral?id=${referrerId}`);
        const data = await response.json();

        if (response.ok) {
          setReferrer(data.referrer);
          setPlanTitle(data.referrer.package);
        }
      } catch (error) {
        console.error('Error fetching referrer:', error);
      } finally {
        setLoading(false);
      }
    };

    if (referrerId) {
      fetchReferrer();
    }
  }, [referrerId]);

  useEffect(() => {
    if (!loading && referrer) {
      setIsModalOpen(true);
    }
  }, [loading, referrer]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!referrer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Referral Link</h1>
          <p>This referral link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(true)}
        planTitle={planTitle}
        referrerId={referrerId || undefined}
      />
    </div>
  );
}
