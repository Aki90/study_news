/* 
  프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수는
  보통 이렇게 src 디렉터리에 lib 디렉터리를 만든 후
  그 안에 작성합니다.
*/

import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 로딩중 / 완료 / 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}