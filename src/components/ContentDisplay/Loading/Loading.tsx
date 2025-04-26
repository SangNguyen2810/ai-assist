import React from 'react';
import { UI_ERRORS } from '@/constants/errors';

const Loading: React.FC = () => (
  <section className="grow flex flex-col items-center justify-center border rounded-lg p-4">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="mt-4 text-gray-600">{UI_ERRORS.CONNECTING}</p>
  </section>
);
export default React.memo(Loading);