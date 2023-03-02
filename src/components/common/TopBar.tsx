import Back from '@public/static/back.svg'
import MainLogo from '@public/static/main_logo.svg'
import TestResultLogo from '@public/static/test_result_logo.svg'
import Router from 'next/router'
import React from 'react'

interface ITopBar {
  isBackButton?: boolean;
  mainMessage?: 'main' | 'result';
  onBackButton?: () => void;
}

export default function TopBar({
  isBackButton,
  mainMessage = 'main',
  onBackButton = () => {
    Router.back();
  },
}: ITopBar) {
  return (
    <div className="flex w-full justify-between p-6">
      {isBackButton ? (
        <button>
          <Back onClick={onBackButton} />
        </button>
      ) : (
        <div />
      )}
      {mainMessage === 'main' ? <MainLogo /> : <TestResultLogo />}
      <div />
    </div>
  );
}
