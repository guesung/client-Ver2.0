import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { HobbyType } from 'types/result';

import Button from '../common/Button';

interface CardProps {
  id: string | number | string[];
  hobby: HobbyType;
}
export default function Card({ hobby, id }: CardProps) {
  const router = useRouter();
  return (
    <div className="relative flex h-[16.5625rem] w-[calc(100%-1rem)] flex-col rounded-[1.875rem] border border-main-3 pt-[2.75rem] ">
      <div className="flex h-[8rem] flex-col items-center gap-5">
        <Image alt="hobby" src={hobby.imageUrl} width={70} height={70} />
        <p className="mb-5 font-AppleB text-[1.125rem] leading-[1.5625rem] text-gray-6">
          {hobby?.name}
        </p>
      </div>
      <div className="mt-2 px-4">
        <Button
          small
          onClick={() => {
            router.push(`/result/${id}/hobby-detail/${hobby.id}`);
          }}
          className="h-[3.5rem] rounded-[1.25rem] font-AppleM  text-[1.125rem] text-gray-7"
        >
          더 알아보기
        </Button>
      </div>
    </div>
  );
}
