import test, { expect } from '@playwright/test';

test('[POST] Создание книги и верификация результата', async ({ request }) => {
  const res = await request.post('/booking', {
    data: {
      'firstname': 'James',
      'lastname': 'Brown',
      'totalprice': 111,
      'depositpaid': true,
      'bookingdates': {
        'checkin': '2018-01-01',
        'checkout': '2019-01-01',
      },
      'additionalneeds': 'Breakfast',
    },
    headers: {
      'Cookie': `token=${process.env.TOKEN!}`,
    },
  });
  const body = await res.json();

  await expect(res).toBeOK();
  expect(body.booking.firstname).toEqual('James');
});
