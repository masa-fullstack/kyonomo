export const shareTargetPicker = async (text: string, url: string) => {
  const liff = (await import('@line/liff')).default
  await liff.ready
  if (liff.isApiAvailable('shareTargetPicker')) {
    liff.shareTargetPicker([
      {
        type: 'template',
        altText: 'This is a buttons template',
        template: {
          type: 'buttons',
          // thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
          // imageAspectRatio: 'rectangle',
          // imageSize: 'cover',
          // imageBackgroundColor: '#FFFFFF',
          // title: 'Menu',
          text: 'Please select',
          actions: [
            {
              type: 'postback',
              label: text,
              data: 'action=buy&itemid=123',
            },
            {
              type: 'postback',
              label: 'Add to cart',
              data: 'action=add&itemid=123',
            },
            {
              type: 'uri',
              label: url,
              uri: 'http://example.com/page/123',
            },
          ],
        },
      },
      // {
      //   type: 'text',
      //   text: `${text}\n${url}`,
      // },
    ])
  }
}
