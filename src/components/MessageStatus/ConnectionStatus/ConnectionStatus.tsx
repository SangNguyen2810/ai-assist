import React from 'react';
import { SUCCESS_MESSAGES, UI_ERRORS } from '@/constants/errors';

type StatusProps = {
  message: string;
};

type ModelStatusProps = {
  modelName: string;
};

export const ErrorStatus: React.FC<StatusProps> = ({ message }) => (
  <section className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
    <strong className="font-bold">{UI_ERRORS.CONNECTION_ERROR}: </strong>
    <span className="block sm:inline">{message}</span>
  </section>
);

export const SuccessStatus: React.FC<ModelStatusProps> = ({ modelName }) => (
  <section className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
    <strong className="font-bold">{SUCCESS_MESSAGES.CONNECTION_ESTABLISHED}: </strong>
    <span className="block sm:inline">
      {SUCCESS_MESSAGES.USING_MODEL}: {modelName}
    </span>
  </section>
);

export const CheckingStatus: React.FC = () => (
  <section className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
    <span className="block sm:inline">{UI_ERRORS.CHECKING_CONNECTION}</span>
  </section>
); 