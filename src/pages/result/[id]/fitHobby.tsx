import Image from 'next/image';
import React, { useState } from 'react';
import { FitHobbyType, Recommendation, RecommendationType } from 'types/result';
import { CONFIG } from '@config';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import TopBar from '@components/common/TopBar';

interface FitHobbyPageProps {
  id: number;
  recommendation: RecommendationType;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const { data }: { data: Recommendation } = await axios.get(
    `/recommendations/${id}`,
  );
  const recommendation = data.data.recommendation;
  return { props: { id, recommendation } };
};

export default function FitHobby({ id, recommendation }: FitHobbyPageProps) {
  const [select, setSelect] = useState<number>(0);

  const {
    fitHobbyTypes,
    user: { name: userName },
  } = recommendation;

  const selectedType = fitHobbyTypes.filter(
    (fitHobbyType) => +fitHobbyType.id === select,
  )[0];
  const QUESTION_IMAGE_SRC = `${CONFIG.API_CLOUD}/images/etc/question-mark.png`;

  return (
    <div>
      <TopBar mainMessage="result" isBackButton={true} />
      <p className="py-5 text-center text-[1.5rem] font-bold text-main-4">
        나와 찰떡인 홀랑 유형
      </p>
      <section className="flex">
        {fitHobbyTypes.map((fitHobbyType: FitHobbyType, index: number) => (
          <div
            className="flex w-full flex-col items-center border-b border-gray-5"
            key={fitHobbyType.id}
          >
            <div className="rounded-[1.875rem] bg-gray-2 p-3">
              <Image
                alt="fit-type"
                src={fitHobbyType.imageUrl}
                width={80}
                height={80}
                onClick={() => {
                  setSelect(fitHobbyType.id);
                }}
              />
            </div>
            <span className="py-3 text-[1rem] text-gray-7">{index + 1}위</span>
          </div>
        ))}
      </section>
      <section>
        <div
          className={`flex flex-col items-center justify-center ${
            select !== 0 && 'hidden'
          }`}
        >
          <Image
            alt="question-mark"
            src={QUESTION_IMAGE_SRC && QUESTION_IMAGE_SRC}
            width={180}
            height={180}
            className="mt-10 mb-5"
          />
          <p className="text-[1.375rem] text-gray-7">
            {userName}님과 잘 맞는 유형을 선택해봐요!
          </p>
        </div>
        <div
          className={`flex flex-col items-center ${select === 0 && 'hidden'}`}
        >
          <p className="py-[3.75rem] text-[1.5rem] text-main-3">
            {selectedType?.name}
          </p>
          <Image
            alt="question-mark"
            src={selectedType?.imageUrl}
            width={180}
            height={180}
          />
          <p className="mt-[1.75rem] text-[1.125rem] leading-[1.5625rem]">
            {selectedType?.description}
          </p>
        </div>
      </section>
    </div>
  );
}
