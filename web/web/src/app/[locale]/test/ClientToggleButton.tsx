'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ClientToggleButtonProps {
  initialView: string | null;
}

export default function ClientToggleButton({ initialView }: ClientToggleButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') || initialView;

  const updateView = (newView: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('view', newView);
    router.push(newUrl.toString());
  };

  return (
    <button
      onClick={() => updateView(view === 'contact' ? 'other' : 'contact')}
      className='toggle-button'
    >
      {view === 'contact' || !view ? 'Show Other Content' : 'Show Contact Form'}
    </button>
  );
}
