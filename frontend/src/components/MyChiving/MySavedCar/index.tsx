import { Fragment, MouseEvent, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { MyCarProps } from '@/types/trim';
import { MyChivingProps } from '@/types/myChiving';
import { OptionContextProps } from '@/types/option';
import { useModalContext } from '@/hooks/useModalContext';
import { useInfiniteFetch } from '@/hooks/useInfiniteFetch';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ModalType, apiPath } from '@/constants';

import { MyCarList } from '@/components/MyChiving/MyCarList';
import { NoDataInfo } from '@/components/MyChiving/NoDataInfo';
import { PopupModal } from '@/components/common/PopupModal';
import { ModalPortal } from '@/components/common/ModalPortal';
import { ReviewSkeleton } from '@/components/common/ReviewSkeleton';

import * as Styled from './style';

type MatchPathType = Record<string, string>;

const matchPath: MatchPathType = {
  engine: '/engine',
  bodyType: '/trim/body-type',
  wheelDrive: '/trim/whell-drive',
  interiorColor: '/color',
  exteriorColor: '/color',
  selectOptions: '/option',
};

interface ClickEventDataProps {
  deleteText: string;
  moveText: string;
}

export function MySavedCar() {
  const { handleOpen } = useModalContext();
  const navigate = useNavigate();

  const fetchMoreElement = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreElement);
  const nextOffset = useRef(1);

  const { data: myChivings, isLoading } = useInfiniteFetch<MyChivingProps>({
    key: 'myChivings',
    url: apiPath.mychiving(nextOffset.current, 8),
    intersecting,
    nextOffset,
    dependencies: [''],
  });

  const modalInfo = useRef({
    type: ModalType.CLOSE,
    contents: '',
    onClick: () => {},
  });

  const myCar: MyCarProps = {
    carType: { krName: '펠리세이드', enName: 'Palisade' },
    trim: { name: '', price: 0, id: 0 },
    engine: { name: '', additionalPrice: 0, id: 0 },
    bodyType: { name: '', additionalPrice: 0, id: 0 },
    wheelDrive: { name: '', additionalPrice: 0, id: 0 },
    exteriorColor: { name: '', colorImageUrl: '', additionalPrice: 0 },
    interiorColor: { name: '', colorImageUrl: '', id: 1 },
    options: [],
    carImageUrl: '',
  };

  function handleNavigate(myChiving: MyChivingProps) {
    const { trim, engine, bodyType, wheelDrive, exteriorColor, interiorColor, selectOptions, carCode } = myChiving;
    const savedMyCar: MyCarProps = {
      ...myCar,
      trim: trim ?? myCar.trim,
      engine: engine ?? myCar.engine,
      bodyType: bodyType ?? myCar.bodyType,
      wheelDrive: wheelDrive ?? myCar.wheelDrive,
      exteriorColor: exteriorColor ?? myCar.exteriorColor,
      interiorColor: interiorColor ?? myCar.interiorColor,
      options: selectOptions
        ? (selectOptions.map(props => {
            return {
              ...props,
            };
          }) as OptionContextProps[])
        : [],
      carImageUrl: exteriorColor ? exteriorColor.carImageUrl : '',
    };

    localStorage.setItem('myCar', JSON.stringify(savedMyCar));
    if (myChiving.isSaved) {
      navigate('/result');
    } else {
      const targetIndex = Object.values(myChiving).findIndex(value => value === null);
      const lastIndex = Object.values(myChiving).length - 1;
      const targetPath = Object.keys(myChiving)[targetIndex === -1 ? lastIndex : targetIndex];

      if (targetPath === 'selectOptions') {
        navigate(`${matchPath[targetPath]}?car_code=${carCode}`);
        localStorage.setItem('carCode', carCode || '');
        return;
      }

      navigate(matchPath[targetPath]);
    }
  }

  function handleDeleteList(myChiving: MyChivingProps) {
    myChiving;
  }

  function handleClick(myChiving: MyChivingProps, data: ClickEventDataProps, event: MouseEvent<HTMLDivElement>) {
    const element = event.target as Element;
    const deleteButton = element.closest('button');

    if (deleteButton) {
      modalInfo.current = {
        type: ModalType.DELETE,
        contents: data.deleteText,
        onClick: () => handleDeleteList(myChiving),
      };
    } else {
      modalInfo.current = { type: ModalType.MOVE, contents: data.moveText, onClick: () => handleNavigate(myChiving) };
    }
    handleOpen();
  }

  return (
    <Fragment>
      <Styled.Contianer>
        {myChivings.length === 0 ? (
          isLoading ? (
            <ReviewSkeleton />
          ) : (
            <NoDataInfo infoText="내 차 목록에 저장한 차량이 없어요" buttonText="내 차 만들기" toPath="/trim" />
          )
        ) : (
          <>
            <Styled.MyCarBox>
              {myChivings.map((data, index) => (
                <MyCarList key={index} myChiving={data} onClick={handleClick} />
              ))}
            </Styled.MyCarBox>
            {isLoading && (
              <Styled.Wrapper>
                <Styled.Loading />
                <Styled.Loading />
              </Styled.Wrapper>
            )}
          </>
        )}
        <div ref={fetchMoreElement}></div>
      </Styled.Contianer>
      <ModalPortal>
        <PopupModal
          type={modalInfo.current.type}
          onClick={modalInfo.current.onClick}
          contents={modalInfo.current.contents}
        />
      </ModalPortal>
    </Fragment>
  );
}
