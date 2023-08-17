export const data = {
  nextOffset: 1,
  mychivings: [
    {
      myChivingId: 1,
      lastModifiedDate: '2023-07-22',
      isSaved: false,
      totalPrice: 47720000,
      model: {
        id: 1,
        name: '펠리세이드',
      },
      trim: {
        id: 1,
        name: 'Le Blanc',
        price: 1000,
      },
      engine: {
        id: 1,
        name: '디젤 2.2',
        additionalPrice: 10000,
      },
      bodyType: null,
      wheelDrive: null,
      interiorColor: null,
      exteriorColor: null,
      selectedOptions: null,
    },
    {
      myChivingId: 2,
      lastModifiedDate: '2023-07-19',
      isSaved: true,
      totalPrice: 47720000,
      model: {
        id: 1,
        name: '펠리세이드',
      },
      trim: {
        id: 1,
        name: 'Le Blanc',
        price: 1000,
      },
      engine: {
        id: 1,
        name: '디젤 2.2',
        additionalPrice: 10000,
      },
      bodyType: {
        id: 1,
        name: '7인승',
        additionalPrice: 10000,
      },
      wheelDrive: {
        id: 1,
        name: '4WD',
        additionalPrice: 10000,
      },
      interiorColor: {
        id: 1,
        name: '문라이트 블루 펄',
        colorImageUrl: 'img url',
      },
      exteriorColor: {
        id: 1,
        name: '퀄팅 천연(블랙)',
        carImageUrl: 'image url',
        colorImageUrl: 'img url',
        additionalPrice: 10000,
      },
      selectedOptions: [
        {
          id: 'StringId',
          name: '컴포트 ||',
          imageUrl: '이미지 url 입니다.',
          subOptions: ['후석 승객 알림'],
          additionalPrice: 1000,
        },
        {
          id: 'StringId',
          name: '듀얼 와이드 선루프',
          imageUrl: '이미지 url 입니다.',
          subOptions: ['후석 승객 알림'],
          additionalPrice: 1000,
        },
      ],
    },
  ],
};
